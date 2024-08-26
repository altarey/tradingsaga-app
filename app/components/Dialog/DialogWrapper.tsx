import React from 'react';
import {SafeAreaView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import DialogBackground from './DialogBackground';

export interface DialogProps {
  onBackdropPress?: () => void;
  isBackgroundVisible?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DialogWrapper: React.FC<DialogProps> = ({children, isBackgroundVisible = true, onBackdropPress, style}) => {
  return (
    <View style={[styles.wrapper, styles.container, style]}>
      {isBackgroundVisible && <DialogBackground onPress={onBackdropPress} />}
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

export default DialogWrapper;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 1300,
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
