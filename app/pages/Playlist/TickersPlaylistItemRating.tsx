import {PlaylistItemRating} from '../../tickers';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import TickersRatingIcon from './TickersRatingIcon';
import appScale from '../../utils/appScale';
import tickersPlaylistStyles from './TickersPlaylistStyles';
import {percentFormat1} from '../../utils/common-utils';

interface TickersPlaylistItemRatingProps {
  rating?: PlaylistItemRating;
  defaultTextStyle?: TextStyle;
}

const TickersPlaylistItemRating: React.FC<TickersPlaylistItemRatingProps> = ({rating, defaultTextStyle = {}}) => {
  const tradeReturn = rating?.tradeReturn ?? null;
  const points = rating?.points ?? 0;
  const isPlayed = tradeReturn !== null;
  const contentText = isPlayed ? percentFormat1(tradeReturn as number) : 'Not played';

  const isNegativeTradeReturn = tradeReturn !== null && tradeReturn < 0;
  const containerStyles: ViewStyle[] = [styles.container];
  const textStyles: TextStyle[] = [defaultTextStyle, styles.text];
  if (isPlayed) {
    containerStyles.push(isNegativeTradeReturn ? styles.negativeBackground : styles.positiveBackground);
    textStyles.push(styles.textPlayed);
  }

  return (
    <View style={containerStyles}>
      <Text style={textStyles}>{contentText}</Text>
      <TickersRatingIcon ratingPoints={points} />
    </View>
  );
};

export default TickersPlaylistItemRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0f2f0f',
    marginBottom: appScale(4),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    ...tickersPlaylistStyles.cell,
    ...tickersPlaylistStyles.rateCell,
  },
  text: {
    marginHorizontal: appScale(2),
    flex: 0.8,
  },
  textPlayed: {
    color: '#ffffff',
  },
  negativeBackground: {
    backgroundColor: '#652512',
  },
  positiveBackground: {
    backgroundColor: '#1c381c',
  },
});
