import {TickerDataFile} from '../tickers';

const getTickerDateRange = (history: TickerDataFile['history']) => {
  const start = history[0].date;
  const end = history[history.length - 1].date;
  return {
    start,
    end,
  };
};

export default getTickerDateRange;
