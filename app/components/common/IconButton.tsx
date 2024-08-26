import React, {useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Animated,
  TouchableWithoutFeedback, View, Insets,
} from 'react-native';
import AppSound from '../../utils/appSound';
import Colors from '../../config/colors';
import appScale from '../../utils/appScale';

const DEFAULT_ICON_SIZE = appScale(24);

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutFeedback);

export interface IconButtonProps {
  source: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  iconSize?: number;
  disableTintColor?: boolean;
  insets?: Insets
}

const DEFAULT_INSET = appScale(3);

const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    source,
    onPress,
    iconStyle,
    containerStyle,
    disabled,
    iconSize = DEFAULT_ICON_SIZE,
    disableTintColor = false,
    insets,
  } = props;

  const animation = useState(new Animated.Value(0))[0];

  const handlePress: IconButtonProps['onPress'] = (event) => {
    onPress(event);
  };

  const handlePressIn = () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    Animated.timing(animation, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const containerAnimationStyle = {
    opacity: animation.interpolate({inputRange: [0, 1], outputRange: [1, 0.8]}),
    transform: [
      {
        scale: animation.interpolate({inputRange: [0, 1], outputRange: [1, 0.9]}),
      },
    ],
  };

  const iconMargin = {
    marginLeft: insets?.left ?? DEFAULT_INSET,
    marginTop: insets?.top ?? DEFAULT_INSET,
    marginRight: insets?.right ?? DEFAULT_INSET,
    marginBottom: insets?.bottom ?? DEFAULT_INSET,
  };

  const containerStyles = [containerStyle, containerAnimationStyle];
  const iconStyles = [
    styles.icon,
    iconMargin,
    {width: iconSize, height: iconSize},
    iconStyle,
    disabled && !disableTintColor && styles.iconDisabled,
  ];

  return (
    <AnimatedTouchable
      style={containerStyles}
      touchSoundDisabled
      disabled={disabled}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View>
        <View style={styles.touchableArea}/>
        <Image source={source} style={iconStyles} />
      </View>
    </AnimatedTouchable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  iconDisabled: {
    tintColor: Colors.GRAY.default,
  },
  touchableArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
