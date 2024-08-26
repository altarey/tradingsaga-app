export interface Glossary {
  title: string;
  description: string;
  readMoreLink?: string;
}

const GLOSSARY: Glossary[] = [
  {
    title: 'Profit',
    description:
      'This is how much cash profit you make during the run. It’s your final balance minus the money you started with.',
  },
  {
    title: 'Returns',
    description:
      'This is the % returns from your starting balance. It is calculated by dividing your final balance value by your starting balance.',
  },
  {
    title: 'S&P',
    description:
      'S&P is the Standard and Poor’s 500. It is a stock market index that looks at 500 publicly traded stocks in the USA and is used as an indicator of the USA stock market performance. At the end of a run you’ll be shown the returns% of S&P500 for the same time period. Use it as a guide to see how well you did against the stock market as a whole during that time period.',
  },
  {
    title: 'Buy & Hold',
    description:
      'This is the returns% of the stock from the first day of trading to the last. If you purchased shares on day 1 of the run and then sold them on the final day, this is what your returns% would be.',
  },
  {
    title: 'SMA',
    description:
      'A SMA (simple moving average) or moving average (MA), which used interchangeably, is a popular chart line. It smooths out stock price trend by filtering out the “noise” from a short-term price fluctuations. The most common application of moving average is to identify a trend direction. If the SMA is moving up, the trend is up. If the SMA is moving down, the trend is down.',
    readMoreLink: 'https://www.investopedia.com/articles/active-trading/052014/how-use-moving-average-buy-stocks.asp',
  },
];

export default GLOSSARY;
