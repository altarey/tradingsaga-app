import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, TextStyle} from 'react-native';

import TutorialConfig from './TutorialConfig';
import AppSound from '../../utils/appSound';

type TextType = React.ReactElement<Text>;

export interface TutorialTextProps {
  children: TextType | TextType[] | string | string[];
  onPress?: (event: GestureResponderEvent) => void;
  style?: TextStyle;
  fontSize?: number;
  isAction?: boolean;
  disabled?: boolean;
}

const TutorialText: React.FC<TutorialTextProps> = ({
  isAction,
  children,
  onPress,
  style,
  fontSize = TutorialConfig.FONT_SIZE,
  disabled,
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled || !onPress) return;

    AppSound.play(AppSound.SOUNDS.TAP);
    onPress(event);
  };
  return (
    <Text style={[styles.text, isAction && styles.isAction, style, {fontSize}]} onPress={handlePress}>
      {children}
    </Text>
  );
};

export default TutorialText;

const styles = StyleSheet.create({
  text: {
    fontFamily: TutorialConfig.FONT_FAMILY,
    color: 'white',
    textAlign: 'center',
    zIndex: 11,
  },
  isAction: {
    color: TutorialConfig.ACTION_TEXT_COLOR,
  },
});
