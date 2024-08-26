import {TickerDataFile} from '../../tickers';
import {Logger} from '../../utils/logger';
import AppAsyncStorage from '../../utils/appAsyncStorage';
import {CHANCE_TO_ROLL_OUT_NEWS, NEWS_FLASHES_DEFAULT_VALUE, NEWS_FLASHES_STORAGE_KEY} from '../../config/constants';

export type TickerDataPointNews = {
  headline: string;
  description: string;
  url?: string;
};

export type TickerDataPoint = {
  price: number;
  date: Date;
  news?: TickerDataPointNews;
  index: number;
};

export const getTickerReturn = (ticker: TickerDataFile): number|undefined => {
  const first = ticker.history[0].price;
  const last = ticker.history[ticker.history.length - 1].price;
  return getPercent(first, last);
}

export const getTickerBenchmarkReturn = (ticker: TickerDataFile): number|undefined => {
  const first = ticker.benchmark.priceOnStart;
  const last = ticker.benchmark.priceOnEnd;
  return getPercent(first, last);
}

const getPercent = (first: number, second: number): number|undefined => {
  return checkPriceValid(first, `first ${first}`) ? (second - first) / first : undefined;
}

const checkPriceValid = (price: number, ticker: string): boolean => {
  if (!price && price !== 0) {
    const msg = `${ticker}'s price cannot be invalid`;
    Logger.logWarning(msg);
    return false;
  }
  return true;
};

export const chooseRandomNews = async <T extends TickerDataPoint | TickerDataFile['history'][0]>(history: T[]): Promise<T[]> => {
  const isNewsFlashesOn = (await AppAsyncStorage.getItemOrDefault(NEWS_FLASHES_STORAGE_KEY, NEWS_FLASHES_DEFAULT_VALUE));

  return history.map((historyItem) => {
    if (!isNewsFlashesOn)
      return {
        ...historyItem,
        news: undefined,
      };

    if (!historyItem.news) return historyItem;

    const showNews = Math.random() > (100 - CHANCE_TO_ROLL_OUT_NEWS)/100;
    if (showNews) return historyItem;

    return {
      ...historyItem,
      news: undefined,
    };
  });
};

export const calculateAmountOfNews = (history: TickerDataPoint[]): number =>
  history.reduce((prev, current) => (current.news ? prev + 1 : prev), 0);
