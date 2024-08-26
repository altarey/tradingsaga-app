import {StyleSheet, View} from 'react-native';
import React from 'react';

import NavbarIcon from '../../../components/Navigation/NavbarIcon';
import {TUTORIAL_ICON} from '../../../config/icons';
import {useStartTutorial, useTutorial} from '../../../contexts/TutorialContext';
import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import appScale from '../../../utils/appScale';

const HelpNavbarRight: React.FC = () => {
  const tutorial = useTutorial();
  const startTutorial = useStartTutorial();

  const handleStartTutorial = () => {
    startTutorial();
    Telemetry.logPressButton(ButtonsNames.HELP_SCREEN_TUTORIAL);
  };

  return (
    <View style={styles.wrapper}>
      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={TUTORIAL_ICON}
        onPress={handleStartTutorial}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: appScale(10),
  },
});

export default HelpNavbarRight;
