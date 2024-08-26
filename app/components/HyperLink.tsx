import React from 'react';
import {Linking, StyleProp, Text, TextStyle} from 'react-native';

import AppSound from '../utils/appSound';

interface HyperLinkProps {
  text: string;
  url: string;
  style?: StyleProp<TextStyle>;
}

const HyperLink: React.FC<HyperLinkProps> = ({text, url, style}) => {
  const handlePress = () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    Linking.openURL(url);
  };

  return (
    <Text style={style} onPress={handlePress}>
      {text}
    </Text>
  );
};
export default HyperLink;
