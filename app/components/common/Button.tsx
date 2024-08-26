import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import Color from 'color';

import {RobotoMedium} from '../../config/fonts';
import Colors from '../../config/colors';
import AppSound from '../../utils/appSound';
import appScale from '../../utils/appScale';

type ButtonTypes = 'primary' | 'secondary';

export interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  type?: ButtonTypes;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {label, onPress, disabled, type = 'primary', style} = props;

  const handlePress: ButtonProps['onPress'] = (event) => {
    AppSound.play(AppSound.SOUNDS.TAP);
    onPress(event);
  };

  const buttonStyles = [
    // order matters
    styles.button,
    type === 'primary' && styles.buttonPrimary,
    type === 'secondary' && styles.buttonSecondary,
    disabled && styles.buttonDisabled,
    style,
  ];
  const textStyles = [
    // order matters
    styles.text,
    disabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity disabled={disabled} onPress={handlePress} style={buttonStyles}>
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderWidth: appScale(1),
    borderRadius: appScale(15),
    paddingVertical: appScale(6),
    paddingHorizontal: appScale(16),
    minHeight: appScale(30),
    minWidth: appScale(140),
    margin: appScale(4),
  },
  buttonPrimary: {
    borderColor: Color(Colors.LIME_GREEN.default).toString(),
    backgroundColor: Color(Colors.LIME_GREEN.default).alpha(0.6).toString(),
  },
  buttonSecondary: {
    borderColor: Color(Colors.LIME_GREEN.default).toString(),
    backgroundColor: Color(Colors.MYRTLE.default).alpha(0.6).toString(),
  },
  buttonDisabled: {
    borderColor: Color(Colors.GRAY.default).toString(),
    backgroundColor: Color(Colors.GRAY.default).alpha(0.6).toString(),
  },
  text: {
    fontSize: appScale(18),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.WHITE.default,
    fontFamily: RobotoMedium,
    fontWeight: 'bold',
  },
  textDisabled: {
    color: Colors.GRAY.default,
  },
});
