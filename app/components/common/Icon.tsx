import React from 'react';
import {Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {ICON_SIZE_DEFAULT} from '../../config/constants';

export interface IconProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  size?: number;
}

const Icon: React.FC<IconProps> = ({source, size = ICON_SIZE_DEFAULT, style}) => (
  <Image source={source} style={[styles.icon, {width: size, height: size}, style]} />
);

export default Icon;

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});
