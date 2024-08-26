import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RobotoRegular} from '../../config/fonts';
import appScale from '../../utils/appScale';

export interface SettingsItemProps {
  rightContent: React.ReactNode;
  title: string;
  subtitle: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({rightContent, title, subtitle}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
      <View style={styles.actionContainer}>{rightContent}</View>
    </View>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(23,50,23)',
    height: appScale(48),
    flexDirection: 'row',
    marginBottom: appScale(24),
    paddingHorizontal: appScale(24),
    paddingVertical: appScale(4),
  },
  actionContainer: {
    marginLeft: 'auto',
    width: appScale(40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: RobotoRegular,
    fontSize: appScale(18),
    color: '#fff',
  },
  subtitleText: {
    fontFamily: RobotoRegular,
    fontSize: appScale(11),
    opacity: 0.6,
    color: '#fff',
  },
});
