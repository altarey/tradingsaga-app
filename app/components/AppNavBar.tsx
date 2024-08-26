import {Image, StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import {Header, StackHeaderProps} from '@react-navigation/stack';
import {NAVBAR_BACKGROUND} from '../config/icons';
import appScale from '../utils/appScale';

const {width} = Dimensions.get('screen');

const AppNavBar: React.FC<StackHeaderProps> = (props) => {
  return (
    <View style={styles.container}>
      <Image style={[StyleSheet.absoluteFill, styles.backgroundImage]} source={NAVBAR_BACKGROUND} />
      <Header {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  backgroundImage: {
    maxWidth: '100%',
    resizeMode: 'cover',
    top: appScale(-2),
    width: width, // It's needed for rounded screens with safe area
  },
});

export default AppNavBar;
