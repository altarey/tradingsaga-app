import {TickerDataFile} from '../tickers-submodule/ticker.schema';
import {getPlaylistAsync, getPlaylistItemData, PlaylistItem, PlaylistItemRating} from './playlist';
import AppAsyncStorage from '../../utils/appAsyncStorage';

export interface NextPlaylistItemToPlayWithHistory extends TickerDataFile {
  playlistItemId: string;
  rating?: PlaylistItemRating;
}

const STORAGE_KEY = 'NEXT_PLAYLIST_ITEM_TO_PLAY_ID';

type NextPlaylistItemToPlayId = string | null;

async function getStorageData(): Promise<NextPlaylistItemToPlayId | null> {
  const storageData = await AppAsyncStorage.getItemOrDefault(
      STORAGE_KEY,
      null /*default value if pull from storage fails*/);
  return storageData ? storageData as NextPlaylistItemToPlayId : null;
}

async function setStorageData(newPlaylistItemToPlayId: NextPlaylistItemToPlayId) {
  await AppAsyncStorage.setItem(STORAGE_KEY, newPlaylistItemToPlayId);
}

export async function saveNextPlaylistItemToPlayIdToStorage(newPlaylistItemToPlayId: NextPlaylistItemToPlayId) {
  await setStorageData(newPlaylistItemToPlayId);
  return newPlaylistItemToPlayId;
}

export async function setNextPlaylistItemToPlayId(): Promise<NextPlaylistItemToPlayId> {
  const playlist = await getPlaylistAsync();
  if (playlist.length === 0) return saveNextPlaylistItemToPlayIdToStorage(null);
  if (playlist.length === 1) return saveNextPlaylistItemToPlayIdToStorage(playlist[0].playlistItemId);

  const playlistItemToPlayId = await getStorageData();
  const playlistItemToPlayIndex = playlist.findIndex(
    (playlistItem) => playlistItem.playlistItemId === playlistItemToPlayId,
  );
  if (playlistItemToPlayIndex === -1) return saveNextPlaylistItemToPlayIdToStorage(playlist[0].playlistItemId);

  if (playlistItemToPlayIndex === playlist.length - 1)
    return saveNextPlaylistItemToPlayIdToStorage(playlist[0].playlistItemId);
  return saveNextPlaylistItemToPlayIdToStorage(playlist[playlistItemToPlayIndex + 1].playlistItemId);
}

export async function getNextPlaylistItemToPlay(): Promise<PlaylistItem | null> {
  const playlist = await getPlaylistAsync();
  let playlistItemToPlayId = await getStorageData();

  if (!playlistItemToPlayId) playlistItemToPlayId = await setNextPlaylistItemToPlayId();

  if (!playlistItemToPlayId) return null;

  if (playlist.length === 0) return null;
  if (playlist.length === 1 && playlist[0].playlistItemId === playlistItemToPlayId) {
    return playlist[0] ?? null;
  }

  let foundPlaylistItem = playlist.find((playlistItem) => playlistItem.playlistItemId === playlistItemToPlayId);
  if (!foundPlaylistItem) playlistItemToPlayId = await setNextPlaylistItemToPlayId();

  foundPlaylistItem = playlist.find((playlistItem) => playlistItem.playlistItemId === playlistItemToPlayId);
  if (!foundPlaylistItem) return null;

  return foundPlaylistItem;
}

export async function getNextPlaylistItemToPlayWithHistory(): Promise<NextPlaylistItemToPlayWithHistory | null> {
  const playlistItemToPlay = await getNextPlaylistItemToPlay();
  if (!playlistItemToPlay) return null;

  const playlistItemData = await getPlaylistItemData(playlistItemToPlay.playlistItemId);
  if (!playlistItemData) return null;

  return {
    ...playlistItemData,
    playlistItemId: playlistItemToPlay.playlistItemId,
    rating: playlistItemToPlay.rating,
  };
}
