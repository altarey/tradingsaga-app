import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {BOARD_BACKGROUND_COLOR, BOARD_FOREGROUND_COLOR, BOARD_Z_INDEXES} from '../boardConstants';

const BoardLoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={BOARD_FOREGROUND_COLOR} />
  </View>
);

export default BoardLoadingIndicator;

const styles = StyleSheet.create({
  container: {
    zIndex: BOARD_Z_INDEXES.BOARD_LOADING_INDICATOR,
    position: 'absolute',
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BOARD_BACKGROUND_COLOR,
  },
});
