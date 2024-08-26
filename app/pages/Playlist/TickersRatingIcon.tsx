import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';
import {getRatingIconSource} from '../../tickers/playlist/playlistRating';

const IMAGE_SIZE = 21;

const TickersRatingIcon = ({ratingPoints}: {ratingPoints: number}) => {
  const source = useMemo(() => getRatingIconSource(ratingPoints), [ratingPoints]);
  if (!source) return null;
  return <Image style={styles.icon} source={source} />;
};

export default TickersRatingIcon;

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
});
