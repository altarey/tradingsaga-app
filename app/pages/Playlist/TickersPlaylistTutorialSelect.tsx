import React from 'react';
import {TutorialSteps, useTutorial, useTutorialNextStepDisabled} from '../../contexts/TutorialContext';
import TutorialTapToContinueDialog from '../../components/Tutorial/TutorialTapToContinueDialog';
import {StyleSheet, Text} from 'react-native';
import appScale from '../../utils/appScale';

const TickersPlaylistWelcomeTutorialDialog: React.FC = () => {
  const tutorial = useTutorial();
  const tutorialNextStepDisabled = useTutorialNextStepDisabled();

  if (tutorial.shouldHideTooltip(TutorialSteps.PLAYLIST_SELECT)) return null;

  return (
    <TutorialTapToContinueDialog
      disabled={tutorialNextStepDisabled.disabled}
      contentStyle={styles.tutorialContentContainerStyle}
      text={<Text>Tap on a row to start playing {'\n'}Tap&hold to move tickers within the playlist</Text>}
      onTapToContinue={() => tutorial.setStep(TutorialSteps.PLAYLIST_BEFORE_RUN)}
    />
  );
};

export default TickersPlaylistWelcomeTutorialDialog;

const styles = StyleSheet.create({
  tutorialContentContainerStyle: {
    minWidth: appScale(340),
  },
});
