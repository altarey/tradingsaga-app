import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const BannerLoading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small"/>
  </View>
);

export default BannerLoading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
