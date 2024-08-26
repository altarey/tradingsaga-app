import React from 'react';
import {ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {PLAYLIST_BG_COLOR} from '../config/constants';

interface FullScreenLoadingSpinner {
  style?: StyleProp<ViewStyle>;
}

const FullScreenLoadingSpinner: React.FC<FullScreenLoadingSpinner> = ({style}) => (
  <View style={[styles.container, style]}>
    <ActivityIndicator size="large" />
  </View>
);

export default FullScreenLoadingSpinner;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,

    backgroundColor: PLAYLIST_BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
