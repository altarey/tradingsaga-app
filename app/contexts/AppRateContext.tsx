import React, {createContext, useContext, useMemo} from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';
import STORAGE_KEYS from '../config/storageKeys';
import {DATE_MIN_VALUE} from '../config/constants';

interface AppRateContextState {
  lastAskToRateUsDate: Date;
  setLastAskToRateUsDate: React.Dispatch<React.SetStateAction<Date>>;

  isAppRated: boolean;
  setIsAppRated: React.Dispatch<React.SetStateAction<boolean>>;

  isNotNowAlreadyPressed: boolean;
  setIsNotNowAlreadyPressed: React.Dispatch<React.SetStateAction<boolean>>;

  runCountToday: number,
  setRunCountToday: React.Dispatch<React.SetStateAction<number>>,
}

const AppRateContext = createContext<AppRateContextState>(undefined!);

export const AppRateProvider: React.FC = ({children}) => {
  const [dateDialogWasShown, setDateDialogWasShown] = useAsyncStorage(
    STORAGE_KEYS.RATE_US_DATE_SHOWN,
    new Date(DATE_MIN_VALUE),
  );
  const [isAppRated, setIsAppRated] = useAsyncStorage(STORAGE_KEYS.RATE_US_APP_RATED, false);
  const [runsCountToday, setRunsCountToday] = useAsyncStorage(STORAGE_KEYS.RUNS_COUNT_TODAY, 0);
  const [hasNotNowBeenPressed, setHasNotBeenPressed] = useAsyncStorage(
    STORAGE_KEYS.RATE_US_NOTNOW_PRESSED,
    false,
  );

  const value: AppRateContextState = useMemo(
    () => ({
      lastAskToRateUsDate: dateDialogWasShown,
      setLastAskToRateUsDate: setDateDialogWasShown,

      isAppRated,
      setIsAppRated,

      isNotNowAlreadyPressed: hasNotNowBeenPressed,
      setIsNotNowAlreadyPressed: setHasNotBeenPressed,

      runCountToday: runsCountToday,
      setRunCountToday: setRunsCountToday,
    }),
    [
      dateDialogWasShown,
      setDateDialogWasShown,

      isAppRated,
      setIsAppRated,

      hasNotNowBeenPressed,
      setHasNotBeenPressed,

      runsCountToday,
      setRunsCountToday,
    ],
  );

  return <AppRateContext.Provider children={children} value={value} />;
};

export const useAppRate = () => {
  const value = useContext(AppRateContext);

  if (!value) throw 'useAppRate must be used within a AppRateProvider';

  return value;
};
