import {RepositoryFile, RepositoryTickerItem, TickerDataFile} from '../tickers-submodule/ticker.schema';

export interface IRepositoryProvider {
  title: string;
  /**
   * loads content of repository (repo items)
   */
  getRepositoryAsync(): Promise<RepositoryFile>;
  /**
   * calculates playlistItemId for repository item, which can be used to identify if that item was already added to playlist
   */
  getPlaylistItemId(item: RepositoryTickerItem, repo: RepositoryFile): string;
  /**
   * loads TickerDataFile by repository item
   */
  getTickerDataFileAsync(item: RepositoryTickerItem, repo: RepositoryFile): Promise<TickerDataFile>;
}
export const globalRepositories: IRepositoryProvider[] = [];

/**
 * Fixing problem caused by HotReloading modules when this module is updated while debugging - it executed new version of this module which added new instance of onlineRepo, while keeping old instance of onlineRepo in it, which caused conflicts
 * @param repo repository provider
 */
export function registerGlobalRepository(repo: IRepositoryProvider) {
  const conflictRepoIndex = globalRepositories.findIndex((x) => x.title === repo.title);
  if (conflictRepoIndex >= 0) {
    globalRepositories.splice(conflictRepoIndex, 1, repo);
  } else {
    globalRepositories.push(repo);
  }
}
