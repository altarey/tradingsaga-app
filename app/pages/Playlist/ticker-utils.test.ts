import {ensurePlaylistInitialized, TickerDataFile} from '../../tickers';
import {getNextPlaylistItemToPlayWithHistory} from '../../tickers/playlist/getNextPlaylistItemToPlay';
import {getTickerBenchmarkReturn, getTickerReturn, chooseRandomNews} from './ticker-utils';

describe('Ticker utils test', () => {
  beforeAll(async () => {
    await ensurePlaylistInitialized();
  });

  it('Normalize data', async (done) => {
    const ticker: TickerDataFile = (await getNextPlaylistItemToPlayWithHistory())!!;
    expect(ticker.ticker).toStrictEqual(ticker.ticker);
    expect(ticker.interval).toStrictEqual(ticker.interval);
    expect(ticker.timeFrameWidth).toStrictEqual(ticker.timeFrameWidth);
    expect(ticker.name).toStrictEqual(ticker.name);
    expect(ticker.label).toStrictEqual(ticker.label);
    expect(ticker.formatVersion).toStrictEqual(ticker.formatVersion);
    expect(ticker.benchmark).toStrictEqual(ticker.benchmark);
    expect(ticker.history).toStrictEqual(ticker.history);

    const stockReturn = getTickerReturn(ticker);
    const benchmarkReturn = getTickerBenchmarkReturn(ticker);
    expect(stockReturn).toBeGreaterThan(0);
    expect(benchmarkReturn).toBeGreaterThan(0);

    done();
  });

  it('Check invalid benchmark price', async (done) => {
    const ticker: TickerDataFile = (await getNextPlaylistItemToPlayWithHistory())!!;
    ticker.benchmark.priceOnStart = 0;

    const invalidBenchmarkPrice = getTickerBenchmarkReturn(ticker);
    expect(invalidBenchmarkPrice).toBeDefined();

    done();
  });

  it('Validate selected news is removed', async (done) => {
    const ticker: TickerDataFile = (await getNextPlaylistItemToPlayWithHistory())!!;

    const EXPECTED_NEWS_COUNT = 3;
    const originalNews = ticker.history.filter(h => h.news);
    expect(originalNews.length === EXPECTED_NEWS_COUNT);

    const historyWithRandomizedNews = await chooseRandomNews(ticker.history);
    const randomizedNews = historyWithRandomizedNews.filter(h => h.news);
    expect(randomizedNews.length < EXPECTED_NEWS_COUNT);

    done();
  });
});
