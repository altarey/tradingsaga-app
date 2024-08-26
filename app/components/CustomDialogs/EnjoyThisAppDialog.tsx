import React from 'react';
import {Dialog, DialogActions, DialogText, DialogTitle} from '../Dialog';
import Button from '../common/Button';
import {StyleSheet} from 'react-native';
import {useDialogs} from '../../contexts/DialogsContext';
import DIALOGS_IDS from '../../config/dialogsIds';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import rateUs from '../../utils/rateUs';
import appScale from '../../utils/appScale';
import {useAppRate} from '../../contexts/AppRateContext';
import {DATE_MIN_VALUE} from '../../config/constants';

interface EnjoyThisAppDialogProps {
  navigation: StackNavigationProp<ParamListBase>;
  hideAskLater?: boolean;
}

const EnjoyThisAppDialog: React.FC<EnjoyThisAppDialogProps> = ({hideAskLater}) => {
  const dialogs = useDialogs();
  const {
    setIsNotNowAlreadyPressed,
    isNotNowAlreadyPressed,
    setIsAppRated,
    setLastAskToRateUsDate,
  } = useAppRate();

  const handleUnmount = () => {
    dialogs.unmount(DIALOGS_IDS.ENJOY_THIS_APP);
  };

  const handleAskLater = async () => {
    Telemetry.logPressButton(ButtonsNames.ENJOY_THIS_APP_DIALOG_NOT_NOW);

    if (isNotNowAlreadyPressed) setIsAppRated(true);
    else {
      setIsNotNowAlreadyPressed(true);
      setLastAskToRateUsDate(new Date(DATE_MIN_VALUE));
    }

    handleUnmount();
  };

  const handleNo = () => {
    Telemetry.logPressButton(ButtonsNames.ENJOY_THIS_APP_DIALOG_NO);
    setIsAppRated(true);
    handleUnmount();
  };

  const handleYes = () => {
    Telemetry.logPressButton(ButtonsNames.ENJOY_THIS_APP_DIALOG_YES);

    handleUnmount();
    rateUs((success) => {
      if (success) setIsAppRated(true);
    });
  };

  const handleCloseIconButtonPress = () => {
    Telemetry.logPressButton(ButtonsNames.ENJOY_THIS_APP_DIALOG_EXIT);

    handleUnmount();
  };

  const handleBackgroundPress = () => {
    Telemetry.logPressButton(ButtonsNames.ENJOY_THIS_APP_DIALOG_PRESS_OUTSIDE);

    handleUnmount();
  };

  return (
    <Dialog
      containerStyle={styles.container}
      onCloseIconButtonPress={handleCloseIconButtonPress}
      onBackgroundPress={handleBackgroundPress}>
      <DialogTitle title="Could you write us a public review?" />
      <DialogText text={'Leave this app an honest feedback.\nWhat features are useful to you?\nWhat features we forgot to add?'} />
      <DialogActions style={styles.actionsContainer}>
        <Button label="Yep" onPress={handleYes} />
        <Button label="No" onPress={handleNo} />
        {!hideAskLater && <Button label="Ask Me Later" onPress={handleAskLater} />}
      </DialogActions>
    </Dialog>
  );
};

export default EnjoyThisAppDialog;

const styles = StyleSheet.create({
  container: {
    width: appScale(520),
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
});

export const RUNS_COUNT_BEFORE_SHOWING_RATE_US = 5;
