import React from 'react';

import TutorialDialog from '../../components/Tutorial/TutorialDialog';
import {TutorialSteps, useTutorial} from '../../contexts/TutorialContext';
import TutorialText from '../../components/Tutorial/TutorialText';

const TickersPlaylistTutorialBeforeRun: React.FC = () => {
  const tutorial = useTutorial();
  if (tutorial.shouldHideTooltip(TutorialSteps.PLAYLIST_BEFORE_RUN)) return null;

  return (
    <TutorialDialog>
      <TutorialText>Tap on the highlighted stock to begin your first run</TutorialText>
    </TutorialDialog>
  );
};

export default TickersPlaylistTutorialBeforeRun;
