import React, {useCallback, useContext, useEffect, useState} from 'react';
import {getPlaylistAsync, Playlist, subscribePlaylistChanged} from '../tickers';
import {useTutorial} from './TutorialContext';
import {getTutorialPlaylistItem} from '../tickers/tutorialPlaylistItem';
import makePlaylistWithDateRanges from '../utils/playlist/makePlaylistWithDataRanges';

const PlaylistContext = React.createContext<Playlist | null>(undefined!);

export const PlaylistProvider: React.FC = ({children}) => {
  const tutorial = useTutorial();
  const [playlist, _setPlaylist] = useState<Playlist | null>(null);

  const setPlaylist = useCallback(
    async (newPlaylist: Playlist) => {
      if (tutorial.isDone) return _setPlaylist(newPlaylist);

      const tutorialPlaylistItem = await getTutorialPlaylistItem();
      if (!tutorialPlaylistItem) return _setPlaylist(newPlaylist);

      _setPlaylist([tutorialPlaylistItem, ...newPlaylist]);
    },
    [tutorial.isDone, _setPlaylist],
  );

  const loadPlaylist = async () => {
    const purePlaylist = await getPlaylistAsync();
    const playlistWithDateRanges = await makePlaylistWithDateRanges(purePlaylist);
    setPlaylist(playlistWithDateRanges);
  };

  useEffect(() => {
    loadPlaylist(); // Load during initializing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial.isDone]);

  useEffect(() => {
    subscribePlaylistChanged(async (newPlaylist) => {
      setPlaylist(await makePlaylistWithDateRanges(newPlaylist));
    });
  }, [setPlaylist]);

  return <PlaylistContext.Provider children={children} value={playlist} />;
};

export const usePlaylist = (): Playlist | null => {
  const playlist = useContext(PlaylistContext);

  if (typeof playlist === 'undefined') throw 'usePlaylist must be used inside PlaylistProvider';

  return playlist;
};
