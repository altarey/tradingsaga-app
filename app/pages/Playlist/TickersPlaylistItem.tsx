import {PlaylistItem} from '../../tickers';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import TickersPlaylistItemRating from './TickersPlaylistItemRating';
import {RobotoRegular} from '../../config/fonts';
import Color from 'color';
import Colors from '../../config/colors';
import appScale from '../../utils/appScale';
import tickersPlaylistStyles from './TickersPlaylistStyles';

export interface TickersPlaylistItemProps {
  playlistItem: PlaylistItem;
  startRun: () => void;
  selectPlaylistItem: (playlistItem: PlaylistItem) => void;
  selectedPlaylistItem: PlaylistItem | null;
  isDisabled: boolean;
  isHighlighted: boolean;
  hasJustAdded: boolean;
  nextToPlay: boolean;
}

export const CONTAINER_HEIGHT = appScale(42);
const TickersPlaylistItem: React.FC<TickersPlaylistItemProps> = ({
  playlistItem,
  selectedPlaylistItem,
  selectPlaylistItem,
  startRun,
  isDisabled,
  isHighlighted,
  hasJustAdded,
  nextToPlay,
}) => {
  const {label, ticker: tickerName, rating, dateRange} = playlistItem;
  const handleOnLongPressItem = () => selectPlaylistItem(playlistItem);

  const isEditing = playlistItem.playlistItemId === selectedPlaylistItem?.playlistItemId;

  const startDate = formatDateRange(dateRange.start);
  const endDate = formatDateRange(dateRange.end);

  const isPlayed = !!rating;
  const cellStyles = isPlayed ? [styles.cell, styles.cellPlayed] : styles.cell;
  const cellTextStyles = isPlayed ? [styles.cellText, styles.cellTextPlayed] : styles.cellText;
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={styles.container}
      onLongPress={handleOnLongPressItem}
      onPress={startRun}>
      <View
        style={[
          styles.highlighter,
          hasJustAdded && styles.highlighterHasJustAdded,
          nextToPlay && styles.highlighterNextToPlay,
          (isEditing || isHighlighted) && styles.highlighterSelected,
        ]}
      />

      <View style={[cellStyles, tickersPlaylistStyles.nameCell]}>
        <Text style={cellTextStyles}>{tickerName.toUpperCase()}</Text>
      </View>
      <View style={[cellStyles, tickersPlaylistStyles.labelCell]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={cellTextStyles}
        >
          {label}
        </Text>
      </View>
      <View style={[cellStyles, tickersPlaylistStyles.dateCell]}>
        <Text style={cellTextStyles}>
          {startDate} - {endDate}
        </Text>
      </View>
      <TickersPlaylistItemRating defaultTextStyle={styles.cellText} rating={rating} />
    </TouchableOpacity>
  );
};

export default TickersPlaylistItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: CONTAINER_HEIGHT,
  },
  highlighter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  highlighterSelected: {
    borderWidth: appScale(2),
    borderColor: Color(Colors.INDIAN_RED.default).alpha(1).toString(),
  },
  highlighterHasJustAdded: {
    backgroundColor: Color(Colors.ROYAL_BLUE.default).alpha(0.3).toString(),
  },
  highlighterNextToPlay: {
    backgroundColor: Color(Colors.FESTIVAL.default).alpha(0.2).toString(),
    borderWidth: appScale(1),
    borderColor: Color(Colors.LASER_LEMON.default).alpha(1).toString(),
  },
  cell: {
    backgroundColor: '#0f2d0f',
    flex: 1,
    marginBottom: appScale(4),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    ...tickersPlaylistStyles.cell,
  },
  cellPlayed: {
    backgroundColor: '#1c381c',
  },
  cellText: {
    color: Color(Colors.WHITE.default).alpha(0.6).toString(),
    fontSize: appScale(16),
    fontFamily: RobotoRegular,
  },
  cellTextPlayed: {
    color: Color(Colors.WHITE.default).toString(),
  },
});

const formatDateRange = (date: string) => moment(date).format('MM/DD/YY');
