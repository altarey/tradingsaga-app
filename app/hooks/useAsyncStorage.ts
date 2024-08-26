import {useState} from 'react';
import AppAsyncStorage from '../utils/appAsyncStorage';
import useAsyncEffect from 'use-async-effect';

const useAsyncStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(initialValue);
  const [isReady, setIsReady] = useState(false);

  useAsyncEffect(async () => {
    setIsReady(false);
    const newValue = await AppAsyncStorage.getItemOrDefault<T>(key, initialValue);
    setValue(newValue);
    setIsReady(true);
  }, []);

  useAsyncEffect(async () => {
    if (isReady) await AppAsyncStorage.setItem(key, value);
  }, [isReady, value, key]);

  return [value, setValue, isReady] as const;
};

export default useAsyncStorage;
