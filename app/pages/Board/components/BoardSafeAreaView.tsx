import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {BOARD_BACKGROUND_COLOR} from '../boardConstants';

const BoardSafeAreaView: React.FC = ({children}) => <SafeAreaView style={styles.container}>{children}</SafeAreaView>;

export default BoardSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BOARD_BACKGROUND_COLOR,
  },
});
