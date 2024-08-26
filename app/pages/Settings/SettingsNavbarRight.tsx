import {StyleSheet, View} from 'react-native';
import React from 'react';
import NavbarIcon from '../../components/Navigation/NavbarIcon';
import {QUESTION_ICON} from '../../config/icons';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../config/routes';

const SettingsNavbarRight: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigateToHelp = () => {
    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_NAVBAR_HELP);
    navigation.navigate(Routes.HELP);
  };

  return (
    <View style={styles.container}>
      <NavbarIcon onPress={handleNavigateToHelp} source={QUESTION_ICON} />
    </View>
  );
};

export default SettingsNavbarRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
