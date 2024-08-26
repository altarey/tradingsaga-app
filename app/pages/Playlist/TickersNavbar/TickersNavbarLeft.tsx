import {StyleSheet, View} from 'react-native';
import {Routes} from '../../../config/routes';
import React from 'react';
import {useTutorial} from '../../../contexts/TutorialContext';
import {NavbarTitle} from '../../../components/Navigation/NavbarTitle';
import {useNavigation} from '@react-navigation/native';
import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import NavbarBackIcon from '../../../components/Navigation/NavbarBackIcon';
import appScale from '../../../utils/appScale';

const TickersNavbarLeft: React.FC = () => {
  const tutorial = useTutorial();
  const navigation = useNavigation();

  const handleBack = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_BACK);
    navigation.navigate(Routes.HOME);
  };

  return (
    <View style={styles.container}>
      <NavbarBackIcon onPress={handleBack} isDisabled={tutorial.isInProgress} />
      <NavbarTitle title="My Playlist" style={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: appScale(40),
  },
});

export default TickersNavbarLeft;
