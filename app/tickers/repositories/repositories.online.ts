import * as Url from 'url';
import {RepositoryFile, RepositoryTickerItem, TickerDataFile} from '../tickers-submodule/ticker.schema';
import {IRepositoryProvider, registerGlobalRepository} from './repositories';

/**
 *  fetches repository tickers from urls
 */
async function fetchOnlineRepository(repoUrl: string): Promise<RepositoryFile> {
  let resp = await fetch(repoUrl, {method: 'GET', cache: 'no-cache'} as any);
  /** @type {TickersOnlineRepository} */
  let res = (await resp.json()) as RepositoryFile;
  if (!(res.tickers && Array.isArray(res.tickers))) {
    throw new Error('Could not find tickers in the repository');
  }

  return res;
}

/**
 *
 * @param {RepositoryTicker} ticker
 * @param {string} baseUrl
 */
async function fetchTickerData(ticker: RepositoryTickerItem, baseUrl: string): Promise<TickerDataFile> {
  if (ticker.data) return ticker.data;

  if (!ticker.url) throw new Error('Repository item must have either data or url');

  let tickerUrl = ticker.url;

  if (baseUrl) tickerUrl = Url.resolve(baseUrl, tickerUrl);
  let resp = await fetch(tickerUrl, {method: 'GET'});
  if (!resp.ok) {
    throw new Error(
      `Could not load ticker data properly. Response status: ${resp.status} ${resp.statusText || ''}. Url: ${resp.url}`,
    );
  }
  let data = (await resp.json()) as TickerDataFile;
  if (data.formatVersion !== '2020.06.24') throw new Error('format version is incorrect');
  return data;
}

const onlineRepoUrl = 'https://tickers.tradingsaga.com/all.json';

const onlineRepo: IRepositoryProvider = {
  title: 'Online',
  async getRepositoryAsync() {
    return await fetchOnlineRepository(onlineRepoUrl);
  },
  async getTickerDataFileAsync(ticker: RepositoryTickerItem) {
    return await fetchTickerData(ticker, onlineRepoUrl);
  },
  getPlaylistItemId(ticker: RepositoryTickerItem): string {
    return Url.resolve(onlineRepoUrl, ticker.url!);
  },
};

registerGlobalRepository(onlineRepo);
