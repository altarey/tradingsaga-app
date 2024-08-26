import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import HyperLink from '../../../components/HyperLink';
import loadServerTNC from '../../../utils/loadServerTNC';
import {TNC_URL, TNC_TIME_URL, PRIVACY_URL, TNC_STORAGE_KEY} from '../../../config/constants';
import {Telemetry} from '../../../utils/telemetry';
import {Logger} from '../../../utils/logger';
import {useDialogs} from '../../../contexts/DialogsContext';
import {useStartTutorial, useTutorial} from '../../../contexts/TutorialContext';
import {useAppStore} from '../../../contexts/AppStore';
import ButtonsNames from '../../../config/buttonsNames';
import Colors from '../../../config/colors';
import Button from '../../../components/common/Button';
import {Dialog, DialogTitle, DialogText, DialogActions} from '../../../components/Dialog';
import {LoadingDialog} from '../../../components/CustomDialogs';
import AppAsyncStorage from '../../../utils/appAsyncStorage';

interface State {
  visible: boolean;
  loading: boolean;
  serverTNC?: string;
}

const DIALOG_TITLE = 'Privacy & Terms';

function HomeTNCDialog() {
  const isTutorialDialogShownRef = useRef(false);
  const dialogs = useDialogs();
  const appState = useAppStore();
  const startTutorial = useStartTutorial();
  const tutorial = useTutorial();
  const [state, setState] = useState<State>({visible: true, loading: true, serverTNC: undefined});
  const setStateMerge = (updatedProps: Partial<State>) =>
    setState((oldState) => Object.assign({}, oldState, updatedProps)); //for some reason  setState does not MERGE state, but replace the state object

  useEffect(() => {
    if (!appState.shouldShowTNCDialog) return;
    Promise.all([AppAsyncStorage.getItem<string>(TNC_STORAGE_KEY), loadServerTNC(TNC_TIME_URL)])
      .then(([acceptedTNC, serverTNC]) => {
        serverTNC = serverTNC || '0';
        Logger.logMessage(`Accepted TNC ${acceptedTNC}`);
        Logger.logMessage(`Server TNC ${serverTNC}`);

        if (!acceptedTNC || serverTNC > acceptedTNC) {
          Logger.logMessage('Server was updated after last Accept or accept was never pressed');
          Logger.logMessage('User must press "Accept"');
          setStateMerge({loading: false, visible: true, serverTNC});
          return;
        }
        setStateMerge({visible: false});
        appState.setShouldShowTNCDialog(false);
      })
      .catch((e) => {
        Logger.logWarning(e);
      });
  }, [appState]);

  function onAcceptPressed() {
    if (!appState.shouldShowTNCDialog) return;

    setStateMerge({loading: true});
    Telemetry.logPressButton(ButtonsNames.HOME_SCREEN_TNC_DIALOG_ACCEPT);
    // TODO: fix in remove any's MR
    // @ts-ignore
    AppAsyncStorage.setItem(TNC_STORAGE_KEY, state.serverTNC).then(() => {
      setStateMerge({loading: false, visible: false});
      appState.setShouldShowTNCDialog(false);
    });
  }

  useEffect(() => {
    if (isTutorialDialogShownRef.current) return;
    if (state.visible) return;
    if (tutorial.isDone) return;
    isTutorialDialogShownRef.current = true;
    startTutorial();
  }, [state, tutorial, dialogs, startTutorial]);

  if (!state.visible || !appState.shouldShowTNCDialog) return null;

  if (state.loading) return <LoadingDialog title={DIALOG_TITLE} loadingMessage="Checking for updates online..." />;

  return (
    <Dialog withCloseIconButton={false}>
      <DialogTitle title={DIALOG_TITLE} />
      <DialogText
        text={
          <>
            Please accept our <HyperLink style={styles.linkText} url={TNC_URL} text="Terms of Service" /> and{' '}
            <HyperLink style={styles.linkText} url={PRIVACY_URL} text="Privacy Policy" /> to continue
          </>
        }
      />
      <DialogActions>
        <Button onPress={onAcceptPressed} label="Accept" />
      </DialogActions>
    </Dialog>
  );
}

export default HomeTNCDialog;

const styles = StyleSheet.create({
  linkText: {
    color: Colors.LIME_GREEN.default,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
