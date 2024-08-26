import {StyleSheet} from 'react-native';
import appScale from '../../utils/appScale';

const tickersPlaylistStyles = StyleSheet.create({
  cell: {
    paddingLeft: appScale(8),
    paddingRight: appScale(4),
    paddingTop: appScale(8),
    paddingBottom: appScale(4),
  },
  nameCell: {
    flex: 0.9,
  },
  labelCell: {
    marginLeft: appScale(4),
    flex: 3.4,
  },
  dateCell: {
    marginLeft: appScale(4),
    flex: 2,
  },
  rateCell: {
    marginLeft: appScale(4),
    flex: 1.4,
  },
});

export default tickersPlaylistStyles;
