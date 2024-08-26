import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from 'color';
import moment from 'moment';

import Colors from '../../config/colors';
import {RobotoRegular} from '../../config/fonts';
import appScale from '../../utils/appScale';

const FallbackCountdownFullScreen: React.FC<{leftoverMs: number}> = ({leftoverMs}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{moment.duration(leftoverMs).format('mm:ss')}</Text>
  </View>
);

export default FallbackCountdownFullScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color(Colors.BLACK.default).alpha(0.5).toString(),
    padding: appScale(4),
  },
  text: {
    fontFamily: RobotoRegular,
    fontWeight: 'bold',
    fontSize: appScale(20),
    color: Colors.WHITE.default,
  },
});
