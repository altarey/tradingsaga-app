import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import Colors from '../../config/colors';
import {RobotoRegular} from '../../config/fonts';
import appScale from '../../utils/appScale';

interface DialogText {
  text: string | React.ReactElement<Text>;
  textStyle?: StyleProp<TextStyle>
}

const DialogText: React.FC<DialogText> = ({text, textStyle}) => (
  <View>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </View>
);

export default DialogText;

const styles = StyleSheet.create({
  text: {
    fontSize: appScale(20),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.WHITE.default,
    fontFamily: RobotoRegular,
    padding: appScale(8),
  },
});
