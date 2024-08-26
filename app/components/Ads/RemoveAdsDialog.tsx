import React, {useMemo, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import useAsyncEffect from 'use-async-effect';

import {NO_ADS_GREEN_OUTLINE_ICON} from '../../config/icons';
import Button from '../common/Button';
import {Dialog, DialogActions, DialogText, DialogTitle} from '../Dialog';
import appScale from '../../utils/appScale';
import {useDialogs} from '../../contexts/DialogsContext';
import DIALOGS_IDS from '../../config/dialogsIds';
import {useIap} from '../../contexts/IapContext';
import {LoadingDialog} from '../CustomDialogs';
import {useAppStore} from '../../contexts/AppStore';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import {getProductRemoveAdsIap} from '../../utils/IapHub';

const ICON_SIZE = appScale(80);

export const RemoveAdsDialog: React.FC = () => {
  const dialogs = useDialogs();
  const iap = useIap();
  const appStore = useAppStore();

  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const handleCloseDialog = () => {
    Telemetry.logPressButton(ButtonsNames.REMOVE_ADS_DIALOG_CLOSE);

    dialogs.unmount(DIALOGS_IDS.REMOVE_ADS);
  };

  useAsyncEffect(async () => {
    setLoadingMessage('Loading...');
    await iap.reloadProductsForSale();
    setLoadingMessage('');
  }, []);

  const handlePurchase = async () => {
    Telemetry.logPressButton(ButtonsNames.REMOVE_ADS_DIALOG_BUY);
    setLoadingMessage('Buying...');
    await iap.buy(getProductRemoveAdsIap().SKU);
    setLoadingMessage('');
  };

  const handleRestore = async () => {
    Telemetry.logPressButton(ButtonsNames.REMOVE_ADS_DIALOG_RESTORE);
    setLoadingMessage('Restoring...');
    await iap.restore();
    setLoadingMessage('');
  };

  const removeAdsPrice = useMemo(() => {
    return iap.productsForSale.find(pfs => pfs.sku === getProductRemoveAdsIap().SKU)?.price ?? getProductRemoveAdsIap().DEFAULT_LOCALIZED_PRICE;
  }, [iap.productsForSale]);

  if (loadingMessage) {
    return <LoadingDialog withCloseIconButton onClose={handleCloseDialog} loadingMessage={loadingMessage} />;
  }

  return (
    <Dialog onCloseIconButtonPress={handleCloseDialog} onBackgroundPress={handleCloseDialog}>
      <Image style={styles.image} source={NO_ADS_GREEN_OUTLINE_ICON} />
      {appStore.noAds ? (
        <>
          <DialogTitle title="Congratulations!" />
          <DialogText text={'Thank you for purchasing our premium version. It will support app development.\n Happy Learning!'} />
        </>
      ) : (
        <>
        <DialogTitle title={`No More Ads for ${removeAdsPrice}`} />
        <DialogText text={'Don\'t want to see ads anymore? Buy our premium version. That will support app development. Happy Learning!'} />
        </>
      )}
      <DialogActions>
        <Button onPress={handlePurchase} disabled={appStore.noAds} label={`Buy ${appStore.noAds ? '(Purchased)' : ''}`} />
        <Button onPress={handleRestore} label="Restore" />
      </DialogActions>
    </Dialog>
  );
};

export default RemoveAdsDialog;

const styles = StyleSheet.create({
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
