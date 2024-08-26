import React from 'react';
import IconButton from '../common/IconButton';
import {CONFIRMATION_EXIT_ICON} from '../../config/icons';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import appScale from '../../utils/appScale';
import generateInsets from '../../utils/generateInsets';

interface DialogCloseIconButtonProps {
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}
const ICON_SIZE = appScale(16);

const DialogCloseIconButton: React.FC<DialogCloseIconButtonProps> = ({onPress = () => {}, containerStyle}) => (
  <View style={[styles.container, containerStyle]}>
    <IconButton
      insets={generateInsets(1.2)}
      source={CONFIRMATION_EXIT_ICON}
      onPress={onPress}
      iconSize={ICON_SIZE}
    />
  </View>
);

export default DialogCloseIconButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: appScale(6),
    top: appScale(6),
    zIndex: 10,
  },
});
