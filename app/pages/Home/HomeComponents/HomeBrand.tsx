import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {FontTradbdo, FontTrado, RobotoRegular} from '../../../config/fonts';
import {APP_TITLE} from '../../../config/constants';
import appScale from '../../../utils/appScale';

export default function HomeBrand() {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitleText}>{APP_TITLE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gameTitleText: {
    marginTop: appScale(12),
    fontSize: appScale(56),
    color: '#ffffff',
    fontFamily: FontTrado,
  },

  gameSloganText: {
    fontSize: appScale(18),
    fontFamily: FontTradbdo,
    color: '#ffffff',
    marginTop: appScale(-12),
  },
  linearGradient: {
    marginTop: appScale(10),
    width: appScale(170),
    height: appScale(40),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appScale(5),
    alignContent: 'center',
    shadowColor: '#4aa341',
  },
  tapInstructionView: {
    width: '100%',
    height: appScale(40),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: appScale(0.7),
    borderRadius: appScale(5),
    borderColor: '#4aa341',
    backgroundColor: 'transparent',
  },
  tapText: {
    fontSize: appScale(14),
    fontFamily: RobotoRegular,
    color: '#ffffff',
    alignSelf: 'auto',
    letterSpacing: appScale(0.7),
  },
});
