import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../config/routes';
import {ADD_MORE_ICON} from '../../config/icons';
import appScale from '../../utils/appScale';

const TickersEmptyPlaylist: React.FC = () => {
  const navigation = useNavigation();
  const handleAddMoreButtonPress = () => navigation.navigate(Routes.ADD_NEW_TICKER);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your playlist is empty!</Text>
      <Text style={styles.text}>{'Add stocks to start playing \n'}</Text>
      <TouchableOpacity onPress={handleAddMoreButtonPress} style={styles.addButtonContainer}>
        <Image source={ADD_MORE_ICON} style={styles.addButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

export default TickersEmptyPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: appScale(20),
    color: 'gray',
    textAlign: 'center',
    lineHeight: appScale(28),
    letterSpacing: appScale(0.6),
  },
  addButtonContainer: {
    marginTop: appScale(-15),
  },
  addButtonImage: {
    width: appScale(40),
    height: appScale(40),
  },
});
