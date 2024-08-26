import React from 'react';
import Icon from './Icon';
import {ImageProps, ImageStyle, StyleProp} from 'react-native';

interface ConditionalIconProps {
  isPositive: boolean;
  positiveIcon: ImageProps['source'];
  negativeIcon: ImageProps['source'];
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const ConditionalIcon: React.FC<ConditionalIconProps> = ({isPositive, positiveIcon, negativeIcon, ...other}) => (
  <Icon source={isPositive ? positiveIcon : negativeIcon} {...other} />
);

export default ConditionalIcon;
