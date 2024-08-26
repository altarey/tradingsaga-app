import {TickerDataFile} from '../tickers-submodule/ticker.schema';
import getTickerDateRange from '../../utils/getTickerDateRange';
import AppAsyncStorage from '../../utils/appAsyncStorage';

export interface PlaylistItemRating {
  tradeReturn: number;
  points: number;
}

/**
 * Item in locally stored playlist - metadata about ticker used for installing tickers from repos + displaying current playlist.
 * Points to locally stored ticker data
 */
export type PlaylistItem = Omit<TickerDataFile, 'history'> & {
  /**
   * identifier of ticker - used to identify if particular ticker was already installed, by comparing it with uid of RepositoryTicker
   */
  playlistItemId: string;
  dateRange: {
    start: string;
    end: string;
  };
  rating?: PlaylistItemRating;
};

const subscribers: {callback: (playlist: Playlist) => any}[] = [];

export function subscribePlaylistChanged(callback: (playlist: Playlist) => any): () => any {
  const subscriber = {callback};
  subscribers.push(subscriber);
  return () => {
    let i = subscribers.findIndex((s) => s.callback === callback);
    if (i >= 0) subscribers.splice(i, 1);
  };
}

function onPlaylistChanged(updated: Playlist) {
  for (const sub of subscribers) {
    sub.callback(updated);
  }
}

export type Playlist = PlaylistItem[];

export const PLAYLIST_STR = 'playlist';

export async function getPlaylistAsync(): Promise<PlaylistItem[]> {
  const resStr = await AppAsyncStorage.getItem<PlaylistItem[]>(PLAYLIST_STR);
  if (!resStr) {
    return [];
  }
  return resStr || [];
}

export async function savePlaylistAsync(playlistItems: PlaylistItem[]) {
  onPlaylistChanged(playlistItems);
  await AppAsyncStorage.setItem(PLAYLIST_STR, playlistItems);
}

function createPlaylistItem(playlistItemId: string, ticker: TickerDataFile): PlaylistItem {
  const res = {
    ...ticker,
    playlistItemId,
    dateRange: getTickerDateRange(ticker.history),
  };
  delete res.history;
  return res;
}

export async function addPlaylistItemsAsync(
  tickerByPlaylistItemId: {playlistItemId: string; ticker: TickerDataFile}[],
) {
  const playlist = await getPlaylistAsync();
  const multiset: [string, string][] = [];
  for (const {playlistItemId, ticker} of tickerByPlaylistItemId) {
    const playlistItem = createPlaylistItem(playlistItemId, ticker);
    playlist.push(playlistItem);
    multiset.push([getPlaylistItemDataStorageKey(playlistItem), JSON.stringify(ticker)]);
  }
  await AppAsyncStorage.multiSet(multiset);
  await savePlaylistAsync(playlist);
  return playlist.length - 1;
}

export async function addPlaylistItemAsync(playlistItemId: string, ticker: TickerDataFile) {
  return addPlaylistItemsAsync([{ticker, playlistItemId}]);
}

function getPlaylistItemDataStorageKey(playlistItemId: string): string;
function getPlaylistItemDataStorageKey(playlistItem: PlaylistItem): string;
function getPlaylistItemDataStorageKey(playlistItemOrId: PlaylistItem | string) {
  const id = typeof playlistItemOrId === 'string' ? playlistItemOrId : playlistItemOrId.playlistItemId;
  return 'playlist-item-data:' + id;
}

export async function getPlaylistItemData(playlistItemId: string): Promise<TickerDataFile | undefined> {
  const jres = await AppAsyncStorage.getItem<TickerDataFile>(getPlaylistItemDataStorageKey(playlistItemId));
  return jres ? jres : undefined;
}

export async function removePlaylistItemsAsync(playlistItemIds: PlaylistItem['playlistItemId'][]) {
  let playlist = await getPlaylistAsync();
  const itemsToRemove = playlist.filter((i) => playlistItemIds.includes(i.playlistItemId));
  const keysToRemove = itemsToRemove.map((i) => getPlaylistItemDataStorageKey(i));
  playlist = playlist.filter((i) => !itemsToRemove.includes(i));

  await savePlaylistAsync(playlist);
  await AppAsyncStorage.multiRemove(keysToRemove);
}

export async function removePlaylistItemAsync(playlistItemId: PlaylistItem['playlistItemId']) {
  await removePlaylistItemsAsync([playlistItemId]);
}

export async function movePlaylistItem(
  playlistItem: PlaylistItem,
  position: -1 | 1,
  callback: (newPlaylistItemIndex: number) => void,
) {
  const playlist = await getPlaylistAsync();
  const playlistItemIndex = getPlaylistItemIndex(playlist, playlistItem.playlistItemId);

  let newPlaylistItemIndex = playlistItemIndex + position;

  if (newPlaylistItemIndex > playlist.length - 1) newPlaylistItemIndex = 0;
  if (newPlaylistItemIndex < 0) newPlaylistItemIndex = playlist.length - 1;

  playlist.splice(playlistItemIndex, 1);
  playlist.splice(newPlaylistItemIndex, 0, playlistItem);

  await savePlaylistAsync(playlist);

  callback(newPlaylistItemIndex);
  return newPlaylistItemIndex;
}

function getPlaylistItemIndex(playlist: Playlist, playListItemId: string) {
  return playlist.findIndex((t) => t.playlistItemId === playListItemId);
}

export async function isPlaylistEmpty(): Promise<boolean> {
  const playlist = await getPlaylistAsync();
  return playlist.length === 0;
}

export async function deleteAllPlaylistPBs() {
  const playlist = await getPlaylistAsync();
  const playlistWithoutPBs = playlist.map((playlistItem) => ({
    ...playlistItem,
    rating: undefined,
  }));
  await savePlaylistAsync(playlistWithoutPBs);
}

export async function purgePlaylist() {
  const playlist = await getPlaylistAsync();
  const keysToRemove = playlist.map((i) => getPlaylistItemDataStorageKey(i));
  await savePlaylistAsync([]);
  await AppAsyncStorage.multiRemove(keysToRemove);
}
