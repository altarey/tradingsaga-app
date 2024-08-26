import fakeTutorialPlaylistItem from './dawb-daily.tutorial-playlist-item.json';
import AppAsyncStorage from '../utils/appAsyncStorage';
import getTickerDateRange from '../utils/getTickerDateRange';
import {PlaylistItem} from './playlist';
import {TickerDataFile} from './tickers-submodule/ticker.schema';
import {NextPlaylistItemToPlayWithHistory} from './playlist/getNextPlaylistItemToPlay';
import {useEffect, useState} from 'react';

const STORAGE_KEY = 'TUTORIAL_PLAYLIST_ITEM';

export const TUTORIAL_PLAYLIST_ITEM_ID = 'tutorial-playlist-item';
export const TUTORIAL_TICKER_NAME = fakeTutorialPlaylistItem.name;

export const loadTutorialPlaylistItemToStorage = async () => {
  await AppAsyncStorage.setItem(STORAGE_KEY, fakeTutorialPlaylistItem);
};

export const getTutorialPlaylistItem = async (): Promise<PlaylistItem | null> => {
  const tutorialPlaylistItem = await AppAsyncStorage.getItem<TickerDataFile>(STORAGE_KEY);
  if (!tutorialPlaylistItem) return null;

  const {history} = tutorialPlaylistItem;
  delete tutorialPlaylistItem.history;

  return {
    ...tutorialPlaylistItem,
    playlistItemId: TUTORIAL_PLAYLIST_ITEM_ID,
    dateRange: getTickerDateRange(history),
  };
};

export const getTutorialPlaylistItemToPlay = async (): Promise<NextPlaylistItemToPlayWithHistory | null> => {
  const tutorialPlaylistItemToPlay = await AppAsyncStorage.getItem<TickerDataFile>(STORAGE_KEY);
  if (!tutorialPlaylistItemToPlay) return null;

  return {
    ...tutorialPlaylistItemToPlay,
    playlistItemId: TUTORIAL_PLAYLIST_ITEM_ID,
  };
};

export const useTutorialPlaylistItemToPlay = (): PlaylistItem | null => {
  const [tutorialPlaylistItemToPlay, setTutorialPlaylistItemToPlay] = useState<PlaylistItem | null>(null);

  useEffect(() => {
    getTutorialPlaylistItem().then(setTutorialPlaylistItemToPlay);
  }, []);

  return tutorialPlaylistItemToPlay;
};
