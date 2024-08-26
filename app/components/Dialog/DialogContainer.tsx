import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Color from 'color';

import Colors from '../../config/colors';
import DialogCloseIconButton from './DialogCloseIconButton';
import appScale from '../../utils/appScale';

export interface DialogContainerProps {
  withCloseIconButton?: boolean;
  onCloseIconButtonPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DialogContainer: React.FC<DialogContainerProps> = (props) => {
  const {children, onCloseIconButtonPress, withCloseIconButton = true, style} = props;

  return (
    <View style={[styles.container, style]}>
      {withCloseIconButton && <DialogCloseIconButton onPress={onCloseIconButtonPress} />}
      {children}
    </View>
  );
};

export default DialogContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: appScale(440),
    minHeight: appScale(100),
    borderColor: Color(Colors.LIME_GREEN.default).alpha(0.8).toString(),
    borderWidth: 1,
    backgroundColor: Color(Colors.MYRTLE.default).toString(),
    paddingVertical: appScale(20),
    paddingHorizontal: appScale(28),
    borderRadius: appScale(10),
  },
});
