import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Colors from '../../config/colors';
import Color from 'color';
import TutorialConfig from './TutorialConfig';
import appScale from '../../utils/appScale';

export interface TutorialLabelProps {
  containerStyle?: StyleProp<ViewStyle>;
  label: string;
}

const TutorialLabel: React.FC<TutorialLabelProps> = ({label, containerStyle}) => (
  <View style={StyleSheet.flatten([styles.container, containerStyle])}>
    <Text numberOfLines={1} style={styles.text}>
      {label}
    </Text>
  </View>
);

export default TutorialLabel;

const styles = StyleSheet.create({
  container: {
    paddingTop: appScale(1),
    paddingBottom: appScale(2),
    borderRadius: appScale(40),
    backgroundColor: Color(Colors.BLACK_PEARL.default).alpha(0.9).toString(),
    alignItems: 'center',
  },
  text: {
    width: '100%',
    paddingHorizontal: appScale(16),
    fontSize: TutorialConfig.FONT_SIZE,
    fontFamily: TutorialConfig.FONT_FAMILY,
    color: 'white',
    zIndex: 11,
  },
});
