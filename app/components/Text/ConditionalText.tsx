import React from 'react';
import {Text, TextProps} from 'react-native';

interface ConditionalTextProps extends TextProps {
  isPositive: boolean;
  positiveText: string;
  negativeText: string;
}

const ConditionalText: React.FC<ConditionalTextProps> = ({isPositive, positiveText, negativeText, ...other}) => (
  <Text {...other} children={isPositive ? positiveText : negativeText} />
);

export default ConditionalText;
