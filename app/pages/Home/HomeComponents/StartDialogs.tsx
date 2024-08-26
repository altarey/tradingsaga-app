import React, {useEffect} from 'react';

import {UPDATE_APP_DIALOG} from '../../../config/constants';
import {useDialogs} from '../../../contexts/DialogsContext';
import useAppVersion from '../../../hooks/useAppVersion';
import HomeAppVersionDialog from '../../Home/HomeComponents/HomeAppVersionDialog';
import {useNetwork} from '../../../contexts/NetworkStateContext';
import {LoadingDialog} from '../../../components/CustomDialogs';
import {useAppStore} from '../../../contexts/AppStore';

const StartDialogs = () => {
  const dialogs = useDialogs();
  const appState = useAppStore();
  const {isInternetReachable} = useNetwork();
  const {shouldShowUpdateDialog, appVersionLoading} = useAppVersion();
  // TODO: add logic for TNC and Tutorial
  useEffect(() => {
    if (!appState.shouldShowStartDialogs) return;

    if (!__DEV__) {
      if (!appVersionLoading && shouldShowUpdateDialog) {
        dialogs.render(() => <HomeAppVersionDialog />, {customId: UPDATE_APP_DIALOG});
      } else {
        dialogs.unmount(UPDATE_APP_DIALOG);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appVersionLoading, shouldShowUpdateDialog, isInternetReachable]);

  if (!appVersionLoading) return <></>;

  if (appState.shouldShowStartDialogs) {
    return <LoadingDialog loadingMessage="Checking for updates online..." />;
  }

  return null;
};

export default StartDialogs;
