import React from 'react';
import {Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import AppSound from '../../utils/appSound';

interface TouchableImageProps {
  source: ImageSourcePropType;
  onPress: () => void;
  touchableStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const TouchableImage: React.FC<TouchableImageProps> = ({onPress, source, touchableStyle, imageStyle}) => {
  const handlePress = () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.touchableOpacity, touchableStyle]}>
      <Image source={source} style={[styles.image, imageStyle]} />
    </TouchableOpacity>
  );
};

export default TouchableImage;

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
});
