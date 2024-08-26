import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {RobotoRegular} from '../../config/fonts';
import appScale from '../../utils/appScale';
import tickersPlaylistStyles from './TickersPlaylistStyles';
import {percentFormat} from '../../utils/common-utils';

export const CONTAINER_HEIGHT = appScale(42);
export interface TickersPlaylistHeadItemProps {
  playlistRating: null | number;
}

export const TickersPlaylistHeadItem: React.FC<TickersPlaylistHeadItemProps> = ({playlistRating}) => (
  <View style={styles.container}>
    <View style={[styles.cell, tickersPlaylistStyles.nameCell]}>
      <Text style={styles.cellText}>Ticker</Text>
    </View>
    <View style={[styles.cell, tickersPlaylistStyles.labelCell]}>
      <Text style={styles.cellText}>Name</Text>
    </View>
    <View style={[styles.cell, tickersPlaylistStyles.dateCell]}>
      <Text style={styles.cellText}>Date Range</Text>
    </View>
    <View style={[styles.cell, tickersPlaylistStyles.rateCell]}>
      <Text style={styles.cellText}>
        Rating {playlistRating === null ? playlistRating : `(${percentFormat(playlistRating)})`}
      </Text>
    </View>
  </View>
);

export default TickersPlaylistHeadItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: CONTAINER_HEIGHT,
    width: '100%',
  },
  cell: {
    backgroundColor: '#062706',
    flex: 1,
    marginBottom: appScale(4),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    ...tickersPlaylistStyles.cell,
  },
  cellText: {
    color: '#ffffff',
    fontSize: appScale(18),
    fontFamily: RobotoRegular,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    marginHorizontal: appScale(2),
  },
});
