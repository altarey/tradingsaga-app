import AsyncStorage from '@react-native-community/async-storage';

const AppAsyncStorage = Object.freeze({
  getItem: async <T>(key: string): Promise<T | null> => {
    let storageValue = await AsyncStorage.getItem(key);
    if (storageValue === null) return null;
    try {
      storageValue = JSON.parse(storageValue);
    }
    catch {
    }
    return (storageValue as T | null);
  },
  getItemOrDefault: async <T>(key: string, defaultValue: T): Promise<T> => {
    const value = await AppAsyncStorage.getItem<T>(key);
    return value ?? defaultValue;
  },
  setItem: async <T>(key: string, value: T) => await AsyncStorage.setItem(key, JSON.stringify(value)),
  removeItem: async (key: string) => await AsyncStorage.removeItem(key),
  multiSet: async (keyValuePairs: string[][], callback?: (errors?: Error[]) => void): Promise<void> => {
    await AsyncStorage.multiSet(keyValuePairs, callback);
  },
  multiRemove: async (keys: string[], callback?: (errors?: Error[]) => void): Promise<void> => {
    await AsyncStorage.multiRemove(keys, callback);
  },
});

export default AppAsyncStorage;
