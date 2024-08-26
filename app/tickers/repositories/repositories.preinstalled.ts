import {IRepositoryProvider, registerGlobalRepository} from './repositories';
import {RepositoryTickerItem} from '../tickers-submodule/ticker.schema';
const PreinstalledTickers = require('../tickers-submodule/preinstalled');

import {getPlaylistAsync, removePlaylistItemsAsync, addPlaylistItemsAsync} from '../playlist';
// TODO: Fix it after migrating JavaScript to Typescript
// @ts-ignore
import preinstalledTickers from '../tickers-submodule/preinstalled';
import {setNextPlaylistItemToPlayId} from '../playlist/getNextPlaylistItemToPlay';

let preinstalledRP: IRepositoryProvider = {
  title: 'Preinstalled',
  async getRepositoryAsync() {
    return {...PreinstalledTickers};
  },
  getPlaylistItemId(item: RepositoryTickerItem) {
    return `preinstalled://${item.ticker}-${item.interval}`;
  },
  async getTickerDataFileAsync(ticker: RepositoryTickerItem) {
    return ticker.data!;
  },
};

/**
 * check if playlist exists. If not exists - it creates it, populating with Preinstalled Tickers
 */
export async function ensurePlaylistInitialized() {
  let playlist = await getPlaylistAsync();
  if (playlist.length) return;

  const repo = await preinstalledRP.getRepositoryAsync();

  let itemsToAdd: Parameters<typeof addPlaylistItemsAsync>[0] = [];

  for (const item of repo.tickers) {
    let playlistItemId = preinstalledRP.getPlaylistItemId(item, preinstalledTickers);
    let ticker = await preinstalledRP.getTickerDataFileAsync(item, repo);
    itemsToAdd.push({playlistItemId, ticker});
  }

  await addPlaylistItemsAsync(itemsToAdd);

  await setNextPlaylistItemToPlayId();
}

/**
 * Clears playlist and populates it with Preinstalled tickers
 *
 * @export
 */
export async function resetPlaylistAsync() {
  const playlist = await getPlaylistAsync();
  await removePlaylistItemsAsync(playlist.map((i) => i.playlistItemId));
  await ensurePlaylistInitialized();
}

registerGlobalRepository(preinstalledRP);
