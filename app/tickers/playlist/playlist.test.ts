import {PlaylistItem} from '../index';
import {RepositoryTickerItem, TickerDataFile} from '../tickers-submodule/ticker.schema';

describe('Playlist', () => {
  it('test addTickersToPlaylist', async (done) => {
    const d: TickerDataFile = {
      label: 'test',
      ticker: 'APPL',
      name: 'name',
      interval: 'daily',
      timeFrameWidth: '800',
      formatVersion: '2020.06.24',
      benchmark: {priceOnEnd: 0, priceOnStart: 0, symbol: 'SPY'},
      history: [],
    };

    const t: RepositoryTickerItem = {
      url: undefined,
      data: d,
    };

    // await addTickersToPlaylist(t);
    done();
  });

  it.skip('test getTickerPlaylist', () => {
    //const g = getTickerPlaylist();
    /*expect(g).toEqual(
        expect.arrayContaining([])
    );*/
  });

  it.skip('test loadTickerPlaylist', async (done) => {
    //const l: PlaylistItem[] | undefined = await loadTickerPlaylist();
    done();
  });

  it.skip('test updateTickerPlaylist', async (done) => {
    //await removeTickersFromPlaylistWithData(undefined);
    done();
  });

  it.skip('test addTickersToPlaylist', async (done) => {
    //await addTickersToPlaylist(undefined);
    done();
  });
});
