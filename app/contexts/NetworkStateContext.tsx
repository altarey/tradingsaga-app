import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
const TIMEOUT = 10000;

export interface NetworkContextProps {
  isInternetReachable: boolean;
}
const NetworkContext = createContext<NetworkContextProps>(null!);

export const NetworkProvider: React.FC = ({children}) => {
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const netInfo = useNetInfo();

  useEffect(() => {
    setIsInternetReachable(netInfo.isInternetReachable || false);

    if (!netInfo.isInternetReachable) {
      const pingInterval = setInterval(async () => {
        const state = await NetInfo.fetch();

        if (state.isInternetReachable) clearInterval(pingInterval);
      }, TIMEOUT);

      return () => clearInterval(pingInterval);
    }
  }, [netInfo.isInternetReachable]);

  const value = useMemo(() => ({isInternetReachable}), [isInternetReachable]);

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};

export const useNetwork = () => {
  const value = useContext(NetworkContext);
  if (!value) throw 'useNetwork must be used inside NetworkProvider';
  return value;
};
