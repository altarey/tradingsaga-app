import {BackHandler} from 'react-native';
import {useEffect} from 'react';

const useOnHardwareBackPress = (handler: () => boolean | null | undefined) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);
    return () => BackHandler.removeEventListener('hardwareBackPress', handler);
  }, [handler]);
};

export default useOnHardwareBackPress;
