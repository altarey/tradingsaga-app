/**
 |--------------------------------------------------
 | APPLICATION HELPERS UTIL
 |--------------------------------------------------
 */

import * as d3 from 'd3';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import {IS_iOS} from './environment';
import {Logger} from './logger';

const formatMillisecond = d3.timeFormat('.%L');
const formatSecond = d3.timeFormat(':%S');
const formatMinute = d3.timeFormat('%I:%M');
const formatHour = d3.timeFormat('%I %p');
const formatDay = d3.timeFormat('%a %d');
const formatWeek = d3.timeFormat('%b %d');
const formatMonth = d3.timeFormat('%b');
const formatYear = d3.timeFormat('%Y');

export const getYear = (date: Date) => moment(date).format('YYYY') as string;

export const mFormat = (date: Date) => {
  return (
    d3.timeSecond(date) < date
      ? formatMillisecond
      : d3.timeMinute(date) < date
        ? formatSecond
        : d3.timeHour(date) < date
          ? formatMinute
          : d3.timeDay(date) < date
            ? formatHour
            : d3.timeMonth(date) < date
              ? d3.timeWeek(date) < date
                ? formatDay
                : formatWeek
              : d3.timeYear(date) < date
                ? formatMonth
                : formatYear
  )(date);
};

export const dateFormat = () => {
  return d3.timeFormat('%B,%d %Y');
};

export const format = (amount: number, fmtText: string) => {
  return d3.format(fmtText)(amount);
};

export const formatCurrency = () => {
  return d3.format('.2');
};

export const dollarFormat = (amount: number) => {
  return d3.format('$,.0f')(amount);
};

export const dollarFormat2 = (amount: number) => {
  return d3.format('.2f')(amount);
};

export const percentFormat = (amount: number) => {
  return d3.format('.1%')(amount);
};

export const percentFormat1 = (amount: number) => {
  return d3.format('+,.1%')(amount);
};

export const percentFormat0 = (amount: number) => {
  return d3.format('.0%')(amount);
};

export const timerFormat = (t: number) => {
  t += 900;
  const duration = moment.duration(t);
  const minAmountOfComponentsToShow = 2;
  const timeComponents = [Math.floor(duration.asHours()), duration.minutes(), duration.seconds()];
  let strComponents: string[] = [];
  for (let i = 0; i < timeComponents.length; i++) {
    const val = timeComponents[i];
    const mustShow = i >= timeComponents.length - minAmountOfComponentsToShow;
    if (!strComponents.length && !val && !mustShow) continue;
    strComponents.push(val.toString().padStart(2, '0'));
  }

  return strComponents.join(':');
};

export const countFormat = (t: number) => {
  const format = d3.format('2');
  return `${format(Math.abs(Math.ceil(t / 1000) % 60))}`;
};

export const deviceDimension = ({width, height}: {width: number; height: number}) => {
  const isLandscape = width > height;
  const hasNotch = DeviceInfo.hasNotch();
  let dimension;
  if (isLandscape) {
    if (IS_iOS) {
      if (hasNotch) {
        dimension = {
          width: width - 90,
          height: height - 42,
        };
      } else {
        dimension = {width: width, height: height - 30};
        //dimension = {width: width, height: height - 40};
      }
    } else {
      //dimension = {width: width, height: height - 32};
      dimension = {width: width, height: height - 30};
    }
  } else {
    if (IS_iOS) {
      if (hasNotch) {
        /** only for the notch devices */
        dimension = {
          width: width,
          height: height - 100,
        };
      } else {
        dimension = {width: width, height: height - 63};
      }
    } else {
      dimension = {width: width, height: height - 63};
    }
  }
  return dimension;
};

export const logScale = (ts: d3.ScaleTime<any, any> | d3.ScaleLinear<any, any>, prefix: string) => {
  Logger.logMessage(`${prefix} R ${ts.range()[0]} ${ts.range()[ts.range().length - 1]}`);
  Logger.logMessage(`${prefix} D ${ts.domain()[0]} ${ts.domain()[ts.domain().length - 1]}`);
};
