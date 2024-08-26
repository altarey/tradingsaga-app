import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Color from 'color';
import Colors from '../../config/colors';

export interface DialogBackgroundProps {
  onPress?: () => void;
  backgroundColor?: string;
}

const DEFAULT_BACKGROUND_COLOR = Color(Colors.BLACK.default).alpha(0.8).toString();

const DialogBackground: React.FC<DialogBackgroundProps> = ({onPress, backgroundColor = DEFAULT_BACKGROUND_COLOR}) => {
  return (
    <TouchableWithoutFeedback style={styles.background} onPress={onPress}>
      <View style={[styles.background, {backgroundColor}]} />
    </TouchableWithoutFeedback>
  );
};

export default DialogBackground;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
