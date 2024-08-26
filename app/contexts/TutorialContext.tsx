import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {Telemetry} from '../utils/telemetry';
import useOnHardwareBackPress from '../hooks/useOnHardwareBackPress';
import DIALOGS_IDS from '../config/dialogsIds';
import {useDialogs} from './DialogsContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';
import {ConfirmationDialog} from '../components/CustomDialogs';
import ButtonsNames from '../config/buttonsNames';
import {Routes} from '../config/routes';

export enum TutorialSteps {
  BEFORE_TUTORIAL = 'BEFORE_TUTORIAL',
  HOME_SCREEN = 'HOME_SCREEN',
  PLAYLIST_SELECT = 'PLAYLIST_SELECT',
  PLAYLIST_BEFORE_RUN = 'PLAYLIST_BEFORE_RUN',
  BOARD_SCREEN_BEFORE_RUN_MESSAGE_ABOUT_STOCK = 'BOARD_SCREEN_BEFORE_RUN_MESSAGE_ABOUT_STOCK',
}

const TUTORIAL_STEP_PAUSE_MS = 1000;

export interface TutorialContextProps {
  isDone: boolean;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  step: TutorialSteps;
  setStep: (newStep: TutorialSteps) => void;
  isInProgress: boolean;
  shouldBeDisabled: (providedStep: TutorialSteps) => boolean;
  shouldHideTooltip: (providedSte: TutorialSteps) => boolean;
  shouldShowTooltip: (providedSte: TutorialSteps) => boolean;
}

const TutorialContext = createContext<TutorialContextProps>(null!);

export const TutorialProvider: React.FC = ({children}) => {
  const [isDone, setIsDone, isDoneReady] = useAsyncStorage('IS_TUTORIAL_DONE', false);
  const [step, _setStep] = useState<TutorialSteps>(TutorialSteps.BEFORE_TUTORIAL);

  const shouldBeDisabled: TutorialContextProps['shouldBeDisabled'] = useCallback(
    (providedStep) => !isDone && step !== providedStep && step !== TutorialSteps.BEFORE_TUTORIAL,
    [isDone, step],
  );

  const shouldHideTooltip: TutorialContextProps['shouldHideTooltip'] = useCallback(
    (providedStep) => isDone || step !== providedStep,
    [isDone, step],
  );
  const shouldShowTooltip: TutorialContextProps['shouldShowTooltip'] = useCallback(
    (providedStep) => !isDone && step === providedStep,
    [isDone, step],
  );

  const setStep = useCallback(
    (newStep: TutorialSteps) => {
      if (step !== TutorialSteps.BEFORE_TUTORIAL) Telemetry.logNextTutorialStep(step);

      _setStep(newStep);
    },
    [step, _setStep],
  );

  const value: TutorialContextProps = useMemo(
    () => ({
      isDone: isDone,
      isInProgress: !isDone && step !== TutorialSteps.BEFORE_TUTORIAL,
      setIsDone,
      step,
      setStep,
      shouldBeDisabled,
      shouldHideTooltip,
      shouldShowTooltip,
    }),
    [shouldBeDisabled, shouldHideTooltip, shouldShowTooltip, isDone, setIsDone, step, setStep],
  );

  // disable pressing hardware back during tutorial
  useOnHardwareBackPress(() => value.isInProgress);

  if (!isDoneReady) return null;
  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
};

export const useTutorial = () => {
  const value = useContext(TutorialContext);
  if (!value) throw 'useTutorial must be used inside TutorialProvider';
  return value;
};

export const useTutorialNextStepDisabled = () => {
  const [isNextStepDisabled, setIsNextStepDisabled] = useState(true);
  const tutorial = useTutorial();

  useEffect(() => {
    next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => {
    if (tutorial.isDone) return;
    setIsNextStepDisabled(true);
    setTimeout(() => setIsNextStepDisabled(false), TUTORIAL_STEP_PAUSE_MS);
  };

  return {
    disabled: isNextStepDisabled && tutorial.isInProgress,
    next,
  };
};

export const useFinishTutorial = () => {
  const dialogs = useDialogs();
  const tutorial = useTutorial();

  return () => {
    if (dialogs.isDialogIdTaken(DIALOGS_IDS.TUTORIAL)) dialogs.unmount(DIALOGS_IDS.TUTORIAL);
    tutorial.setStep(TutorialSteps.BEFORE_TUTORIAL);
    tutorial.setIsDone(true);
  };
};

export const useStartTutorial = () => {
  const tutorial = useTutorial();
  const finishTutorial = useFinishTutorial();
  const dialogs = useDialogs();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return () => {
    if (tutorial.isInProgress) return;
    dialogs.render(
      (unmount) => (
        <ConfirmationDialog
          title="Tutorial Run"
          content="Would you like to go over tutorial?"
          onCancel={() => {
            Telemetry.logPressButton(ButtonsNames.TUTORIAL_DIALOG_CANCEL);
            unmount();
            finishTutorial();
          }}
          onConfirm={() => {
            Telemetry.logPressButton(ButtonsNames.TUTORIAL_DIALOG_CONFIRM);
            unmount();
            tutorial.setStep(TutorialSteps.HOME_SCREEN);
            tutorial.setIsDone(false);
            navigation.push(Routes.HOME);
          }}
        />
      ),
      {customId: DIALOGS_IDS.TUTORIAL_START},
    );
  };
};
