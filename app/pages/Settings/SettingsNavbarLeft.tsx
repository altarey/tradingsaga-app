import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../config/routes';
import {NavbarTitle} from '../../components/Navigation/NavbarTitle';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import NavbarBackIcon from '../../components/Navigation/NavbarBackIcon';
import appScale from '../../utils/appScale';

const SettingsNavbarLeft: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_NAVBAR_BACK);
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate(Routes.HOME);
  };

  return (
    <View style={styles.container}>
      <NavbarBackIcon onPress={handleNavigateHome} />
      <NavbarTitle title="Settings" style={styles.title} />
    </View>
  );
};

export default SettingsNavbarLeft;

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
