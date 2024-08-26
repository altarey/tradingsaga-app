import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';
import STORAGE_KEYS from '../config/storageKeys';
import {useIap} from './IapContext';
import {Telemetry} from '../utils/telemetry';
import {getProductRemoveAdsIap} from '../utils/IapHub';

interface AppStoreContext {
  shouldShowTNCDialog: boolean;
  setShouldShowTNCDialog: React.Dispatch<React.SetStateAction<boolean>>;

  shouldShowStartDialogs: boolean;
  setShouldShowStartDialogs: React.Dispatch<React.SetStateAction<boolean>>;

  noAds: boolean;
  setNoAds: React.Dispatch<React.SetStateAction<boolean>>
}

const AppStore = createContext<AppStoreContext>(undefined!);

export const AppStoreProvider: React.FC = ({children}) => {
  const iap = useIap();
  const [shouldShowTNCDialog, setShouldShowTNCDialog] = useState(true);
  const [shouldShowStartDialogs, setShouldShowStartDialogs] = useState(true);
  const [noAds, setNoAds] = useAsyncStorage(STORAGE_KEYS.IS_NO_ADS_PURCHASED, false);

  useEffect(() => {
    const newState = { noAds: false};

    iap.activeProducts.forEach(ap => {
      if (ap.sku === getProductRemoveAdsIap().SKU) newState.noAds = true;
    });

    Telemetry.logIap('new_restored_state', newState);
    setNoAds(newState.noAds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iap.activeProducts]);

  const value: AppStoreContext = useMemo(
    () => ({
      shouldShowTNCDialog,
      setShouldShowTNCDialog,

      shouldShowStartDialogs,
      setShouldShowStartDialogs,

      noAds,
      setNoAds,
    }),
    [
      shouldShowTNCDialog,
      setShouldShowTNCDialog,
      shouldShowStartDialogs,
      setShouldShowStartDialogs,
      noAds,
      setNoAds,
    ],
  );

  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
};

export const useAppStore = () => {
  const value = useContext(AppStore);
  if (!value) throw 'useAppStore must be used inside AppStoreProvider';
  return value;
};
