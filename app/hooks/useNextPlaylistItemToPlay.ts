import {useEffect, useState} from 'react';

import {getNextPlaylistItemToPlay} from '../tickers/playlist/getNextPlaylistItemToPlay';
import useOnScreenFocus from './useOnScreenFocus';
import {PlaylistItem} from '../tickers';

const useNextPlaylistItemToPlay = () => {
  const [nextPlaylistItemToPlay, setNextPlaylistItemToPlay] = useState<PlaylistItem | null>(null);

  useOnScreenFocus(async () => {
    setNextPlaylistItemToPlay(await getNextPlaylistItemToPlay());
  });

  useEffect(() => {
    getNextPlaylistItemToPlay().then((newNextPlaylistItemToPlay) => {
      setNextPlaylistItemToPlay(newNextPlaylistItemToPlay);
    });
  }, []);

  return nextPlaylistItemToPlay;
};

export default useNextPlaylistItemToPlay;
