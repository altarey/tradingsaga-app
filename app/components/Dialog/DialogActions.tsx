import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import appScale from '../../utils/appScale';

export interface DialogActionsProps {
  style?: StyleProp<ViewStyle>;
}

const DialogActions: React.FC<DialogActionsProps> = ({children, style}) => (
  <View style={[styles.container, style]}>{children}</View>
);

export default DialogActions;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: appScale(14),
  },
});
