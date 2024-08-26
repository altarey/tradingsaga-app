import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Colors from '../../config/colors';
import Color from 'color';
import TutorialConfig from './TutorialConfig';
import appScale from '../../utils/appScale';

export interface TutorialContentProps {
  style?: StyleProp<ViewStyle>;
  isAction?: boolean;
}

const TutorialContent: React.FC<TutorialContentProps> = ({children, style, isAction = false}) => (
  <View style={StyleSheet.flatten([styles.container, isAction && styles.action, style])}>{children}</View>
);

export default TutorialContent;

const styles = StyleSheet.create({
  container: {
    padding: appScale(2),
    borderRadius: appScale(10),
    borderColor: Color(Colors.WHITE.default).alpha(0.5).toString(),
    borderWidth: appScale(1),
    backgroundColor: Colors.BLACK_PEARL.default,
  },
  action: {
    borderColor: TutorialConfig.ACTION_CONTAINER_BORDER_COLOR,
  },
});
