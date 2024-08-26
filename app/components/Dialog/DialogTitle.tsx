import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RobotoRegular} from '../../config/fonts';
import Colors from '../../config/colors';
import appScale from '../../utils/appScale';

interface DialogTitleProps {
  title: string | React.ReactElement<Text>;
}

const DialogTitle: React.FC<DialogTitleProps> = ({title}) => (
  <View>
    <Text style={styles.text}>{title}</Text>
  </View>
);

export default DialogTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: appScale(24),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.WHITE.default,
    fontFamily: RobotoRegular,
    padding: appScale(6),
  },
});
