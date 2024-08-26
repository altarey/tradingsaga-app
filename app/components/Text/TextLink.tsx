import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import Colors from '../../config/colors';
import AppSound from '../../utils/appSound';
import {openLink} from '../../utils/openLink';
import appScale from '../../utils/appScale';

interface TextLinkProps {
  url: string;
  label: string;
  onPress?: () => void;
  style?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}

const TextLink: React.FC<TextLinkProps> = (props) => {
  const {url, label, style, onPress} = props;

  const handlePress = () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    openLink(url);
    onPress && onPress();
  };

  const customStyle = Array.isArray(style) ? style : [style];
  return <Text onPress={handlePress} style={[styles.text, ...customStyle]} children={label} />;
};

export default TextLink;

const styles = StyleSheet.create({
  text: {
    color: Colors.WHITE.default,
    textDecorationLine: 'underline',
    fontSize: appScale(14),
  },
});
