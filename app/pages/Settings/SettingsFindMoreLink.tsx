import React from 'react';
import {WEBSITE_URL} from '../../config/constants';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {RobotoMedium} from '../../config/fonts';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import AppSound from '../../utils/appSound';
import appScale from '../../utils/appScale';

const SettingsFindMoreLink: React.FC = () => {
  const handleOpenBrandURL = async () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_FIND_MORE_ABOUT_US);
    await Linking.openURL(WEBSITE_URL);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Find more about us here at <Text onPress={handleOpenBrandURL}>{WEBSITE_URL}</Text>
      </Text>
    </View>
  );
};

export default SettingsFindMoreLink;

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    paddingTop: appScale(10),
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    opacity: 0.8,
    fontFamily: RobotoMedium,
    fontSize: appScale(13),
  },
});
