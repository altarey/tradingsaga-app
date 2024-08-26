import {Platform, StyleSheet} from 'react-native';
import {RobotoMedium} from '../../config/fonts';
import Colors from '../../config/colors';
import appScale from '../../utils/appScale';

const BOARD_NAV_HEIGHT = appScale(32);

const TutorialConfig = {
  FONT_SIZE: appScale(Platform.select({ios: 18, android: 16, default: 16})),
  FONT_FAMILY: RobotoMedium,
  ACTION_CONTAINER_BORDER_COLOR: Colors.CAMARONE.default,
  ACTION_TEXT_COLOR: Colors.FESTIVAL.default,
};

export default TutorialConfig;

export const TutorialCommonStyles = StyleSheet.create({
  boardDialogContainer: {
    marginTop: BOARD_NAV_HEIGHT,
  },
  boardDialogContent: {
    top: -BOARD_NAV_HEIGHT,
  },
});
