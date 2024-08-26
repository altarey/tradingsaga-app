import {ImageSourcePropType, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native';
import {ADD_MORE_ICON, BUY_SELL_ICON, CONTINUE_PLAY_ICON, PAST_NEWS_ALERT_ICON, RATING_HIGH_ICON} from './icons';
import appScale from '../utils/appScale';

export interface GameplayItem {
  image?: {
    source: ImageSourcePropType;
    size: number;
  };
  icon?: ImageSourcePropType;
  title: string;
  description: string | React.ReactElement<Text>;
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  center: {
    textAlign: 'center',
  },
});

const GAMEPLAY_ITEMS: GameplayItem[] = [
  {
    title: 'Goal',
    description:
      'In a run, your goal is to make as much profit as possible. You make profit by buying and selling shares. If you sell shares at a higher price than what you purchased them for, you’ll make a profit. If you sell them for less than what you purchased them for, you’ll make a loss.',
  },
  {
    title: 'Buying & Selling',
    description:
      'To buy shares during a run, tap the screen. All the money on your balance will then be used to buy shares at the current share price. To sell shares, tap the screen again. All the shares you own will then be sold at the current share price. You may perform as many buys and sells during a run as you like, but you must perform a sell after each buy.',
  },
  {
    title: 'Balance Value',
    description: 'The balance value displays how much money you currently have. You start each run with USD 100,000',
    image: {
      source: require('../assets/resources/img/gameplay/balance.png'),
      size: appScale(24),
    },
  },
  {
    title: 'After Buying',
    description: (
      <Text>
        <Text>
          When you make a buy, all the money on your balance is used to buy shares. The balance will then display:
          {'\n'}{'\n'}
        </Text>
        <Text style={[styles.bold, styles.center]}>Shares Currently Owned x Current Share Price{'\n\n'}</Text>
        <Text style={styles.italic}>Example:{'\n'}</Text>
        <Text>
        Your balance is USD 100,000. You make a buy when a share price is at $100. You now own 1,000 shares.
        The share price changes to USD 101. Henc the balance now shows USD 101,000.
        </Text>
      </Text>
    ),
  },
  {
    title: 'After Selling',
    description: (
      <Text>
        <Text>
          When you sell, all the shares you own are sold at the current share price. The balance now displays how
          much cash you have, which is:{'\n'}{'\n'}
        </Text>
        <Text style={[styles.bold, styles.center]}>Shares Sold x Share Sale Price{'\n\n'}</Text>
        <Text style={styles.italic}>Example:{'\n'}</Text>
        <Text>
          You own 1,000 shares. You sell when the share price is at USD 110. Your balance is USD 110,000 and will
          remain that value until you buy again.
        </Text>
      </Text>
    ),
  },
  {
    title: 'Final Sale',
    description: 'If you own shares when a run ends, then they’ll all be sold at the final share price.',
  },
  {
    title: 'News Alerts',
    description:
      'News alerts may appear during a run. They give you genuine historical information for you to make informed decisions. Read the news and make an informed decision on if the share price will be positively or negatively effected. You may turn off news alerts in the settings menu.',
    icon: PAST_NEWS_ALERT_ICON,
  },
  {
    title: 'News Alerts - Buy/Sell',
    description:
      'During a news alert, tapping the Buy/Sell button when you own shares will perform a sell. Tapping the Buy/Sell button when you don’t own shares will perform a buy.',
    icon: BUY_SELL_ICON,
  },
  {
    title: 'News Alerts - Continue Run',
    description:
      'If you do not wish to buy or sell shares during a news alert, tao the continue run button to continue the run.',
    icon: CONTINUE_PLAY_ICON,
  },
  {
    title: 'Run Speed',
    description:
      'You can change the speed of a run using the icons on the left of the run screen. If you wish to take time and think, then choose the slowest speed. If you want to act fast rely on your trading instincts, choose the fastest speed. You can change the speed at any time.',
  },
  {
    title: 'Rating Medals',
    description: (
      <Text>
        At the end of a run your Returns % is compared against three criteria:{'\n'}
        {'\n'}
        {'\t'}Returns % greater than $0{'\n'}
        {'\t'}Returns % greater than S&P %{'\n'}
        {'\t'}Returns % greater than Buy&Hold %{'\n'}
        {'\n'}
        Clearing one of these criteria will earn you a Bronze medal, two will get you Silver and clearing all three will
        get you Gold.{'\n'}
      </Text>
    ),
    icon: RATING_HIGH_ICON,
  },
  {
    title: `Downloading more Tickers (stocks, crypto, forex)`,
    description:
      'To download stocks, tap the download stocks button in the upper right corner of the playlist screen. You’re able to download  a wide variety of stocks and choose the start and end dates. Choose companies and industries that you are interested in to better understand the stock market.',
    icon: ADD_MORE_ICON,
  },
];

export default GAMEPLAY_ITEMS;
