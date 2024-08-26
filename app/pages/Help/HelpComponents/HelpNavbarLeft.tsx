import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../../config/routes';
import {NavbarTitle} from '../../../components/Navigation/NavbarTitle';
import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import NavbarBackIcon from '../../../components/Navigation/NavbarBackIcon';
import appScale from '../../../utils/appScale';

const HelpNavbarLeft = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    Telemetry.logPressButton(ButtonsNames.HELP_SCREEN_NAVBAR_BACK);
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate(Routes.HOME);
  };

  return (
    <View style={styles.container}>
      <NavbarBackIcon onPress={handleGoBack} />
      <NavbarTitle title="Help & Tutorial" style={styles.title} />
    </View>
  );
};

export default HelpNavbarLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: appScale(54),
  },
});
