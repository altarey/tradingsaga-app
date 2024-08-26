import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import Colors from '../../config/colors';

interface ConditionalColorTextProps extends TextProps {
  isPositive: boolean;
  positiveColor?: string;
  negativeColor?: string;
}

const ConditionalColorText: React.FC<ConditionalColorTextProps> = ({
  isPositive,
  style,
  positiveColor,
  negativeColor,
  ...other
}) => {
  const positiveStyles = positiveColor ? {color: positiveColor} : styles.positive;
  const negativeStyles = negativeColor ? {color: negativeColor} : styles.negative;
  return <Text style={StyleSheet.flatten([style, isPositive ? positiveStyles : negativeStyles])} {...other} />;
};

export default ConditionalColorText;

const styles = StyleSheet.create({
  positive: {
    color: Colors.LIME_GREEN.default,
  },
  negative: {
    color: Colors.TANGERINE.default,
  },
});
