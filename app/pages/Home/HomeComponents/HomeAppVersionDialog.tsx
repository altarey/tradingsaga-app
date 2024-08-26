import React from 'react';
import {Linking} from 'react-native';

import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import Button from '../../../components/common/Button';
import {Dialog, DialogActions, DialogText, DialogTitle} from '../../../components/Dialog';
import {IS_iOS} from '../../../utils/environment';

const STORE_URL = IS_iOS
  ? 'https://apps.apple.com/us/app/trading-saga-stock-simulator/id1491133170'
  : 'https://play.google.com/store/apps/details?id=com.tradingsaga';
const STORE_NAME = IS_iOS ? 'App Store' : 'Google Play';

const HomeAppVersionDialog = () => {
  const onAcceptPressed = async () => {
    Telemetry.logPressButton(ButtonsNames.HOME_SCREEN_FORCE_UPDATE_DIALOG_UPDATE);
    await Linking.openURL(STORE_URL);
  };
  return (
    <Dialog withCloseIconButton={false}>
      <DialogTitle title="New version available" />
      <DialogText text={`Click 'Update' and get the latest version from ${STORE_NAME}.`} />
      <DialogActions>
        <Button onPress={onAcceptPressed} label="Update" />
      </DialogActions>
    </Dialog>
  );
};

export default HomeAppVersionDialog;
