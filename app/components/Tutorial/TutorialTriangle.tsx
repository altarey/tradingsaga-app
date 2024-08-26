import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Color from 'color';

import Colors from '../../config/colors';
import TutorialConfig from './TutorialConfig';
import appScale from '../../utils/appScale';

export interface TutorialTriangleProps {
  style?: ViewStyle | ViewStyle[];
  isAction?: boolean;
}

const TutorialTriangle: React.FC<TutorialTriangleProps> = ({style, isAction = false}) => (
  <View style={style}>
    <View style={[styles.triangle, isAction && styles.action]} />
    <View style={[styles.triangle, styles.secondary]} />
  </View>
);

export default TutorialTriangle;

const styles = StyleSheet.create({
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: appScale(10),
    borderRightWidth: appScale(10),
    borderBottomWidth: appScale(20),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Color(Colors.WHITE.default).alpha(0.5).toString(),
  },
  secondary: {
    top: appScale(2),
    borderBottomColor: Colors.BLACK_PEARL.default,
  },
  action: {
    borderBottomColor: TutorialConfig.ACTION_CONTAINER_BORDER_COLOR,
  },
});
