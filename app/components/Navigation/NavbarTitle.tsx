import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {RobotoRegular} from '../../config/fonts';
import appScale from '../../utils/appScale';

export interface NavbarTitleProps {
  style?: TextStyle;
  title: string;
}

export const NavbarTitle: React.FC<NavbarTitleProps> = ({style, title}) => {
  return <Text style={[styles.text, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: appScale(20),
    fontFamily: RobotoRegular,
    color: '#fff',
  },
});
