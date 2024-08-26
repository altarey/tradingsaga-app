import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../config/routes';
import {NavbarTitle} from '../../components/Navigation/NavbarTitle';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import NavbarBackIcon from '../../components/Navigation/NavbarBackIcon';
import appScale from '../../utils/appScale';

const ImportTickerNavbarLeft: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    Telemetry.logPressButton(ButtonsNames.ADD_NEW_TICKER_SCREEN_NAVBAR_BACK);
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate(Routes.PLAYLIST);
  };

  return (
    <View style={styles.container}>
      <NavbarBackIcon onPress={handleGoBack} />
      <NavbarTitle title="Add a Ticker to My Playlist" style={styles.title} />
    </View>
  );
};

export default ImportTickerNavbarLeft;

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
