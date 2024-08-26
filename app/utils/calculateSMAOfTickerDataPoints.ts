import {TickerDataPoint} from '../pages/Playlist/ticker-utils';

const calculateSMAOfTickerDataPoints = (dataPoints: TickerDataPoint[], smaWindow: number) => {
  if (smaWindow <= 0) return [];
  if (dataPoints.length < smaWindow) return [];

  const simpleMovingAverages = [];

  let index = smaWindow;
  while (index <= dataPoints.length) {
    simpleMovingAverages[index] = {
      index,
      price: calculateMovingAverage(dataPoints, index - smaWindow, index),
    };
    index++;
  }

  return simpleMovingAverages;
};

export default calculateSMAOfTickerDataPoints;

const calculateMovingAverage = (dataPoints: TickerDataPoint[], start: number, end: number) => {
  const windowSlice = dataPoints.slice(start, end);
  const sum = windowSlice.reduce((prev, curr) => prev + curr.price, 0);
  return sum / windowSlice.length;
};
