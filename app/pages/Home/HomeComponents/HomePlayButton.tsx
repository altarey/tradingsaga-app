import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Telemetry} from '../../../utils/telemetry';
import {isPlaylistEmpty} from '../../../tickers';
import {Routes} from '../../../config/routes';
import {TutorialSteps, useTutorial} from '../../../contexts/TutorialContext';
import {PLAY_ICON} from '../../../config/icons';
import ButtonsNames from '../../../config/buttonsNames';
import IconButton from '../../../components/common/IconButton';
import TutorialLabel from '../../../components/Tutorial/TutorialLabel';
import TutorialLabelVerticalContainer from '../../../components/Tutorial/TutorialLabelVerticalContainer';
import HomeNextPlaylistItemToPlay from './HomeNextPlaylistItemToPlay';
import appScale from '../../../utils/appScale';

const TUTORIAL_LABEL_TOP = appScale(-30);

const HomePlayButton: React.FC = () => {
  const tutorial = useTutorial();
  const navigation = useNavigation();

  const handleOnPlay = async () => {
    Telemetry.logPressButton(ButtonsNames.HOME_SCREEN_PLAY);

    if (await isPlaylistEmpty()) return navigation.navigate(Routes.PLAYLIST);
    navigation.navigate(Routes.BOARD);
  };

  return (
    <View style={styles.container}>
      {tutorial.shouldShowTooltip(TutorialSteps.HOME_SCREEN) && (
        <TutorialLabelVerticalContainer top={TUTORIAL_LABEL_TOP}>
          <TutorialLabel label="Start a run" />
        </TutorialLabelVerticalContainer>
      )}
      <IconButton
        disableTintColor={tutorial.isInProgress}
        source={PLAY_ICON}
        onPress={handleOnPlay}
        disabled={tutorial.isInProgress}
        containerStyle={styles.button}
        iconSize={BUTTON_SIZE}
      />
      <HomeNextPlaylistItemToPlay />
    </View>
  );
};

export default HomePlayButton;

const BUTTON_SIZE = appScale(80);

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: appScale(20),
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    marginBottom: appScale(10),
  },
});
