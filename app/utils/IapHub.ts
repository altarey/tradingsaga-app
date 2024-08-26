import Iaphub, {IapHubInitOptions} from 'react-native-iaphub';
import DeviceInfo from 'react-native-device-info';
import {Logger} from './logger';
import {Platform} from "react-native";
import {IS_DEV_MODE} from "./environment";

const APP_ID = '61260bf2546d780ce86de454';

const PROD_OPTIONS: IapHubInitOptions = {
  appId: APP_ID,
  apiKey: 'QdjHoqCCncjpEzRXvQNMJ0MuNvp3con',
  environment: 'production',
};

const TEST_OPTIONS: IapHubInitOptions = {
  appId: APP_ID,
  apiKey: 'QdjHoqCCncjpEzRXvQNMJ0MuNvp3con',
  environment: 'development',
};

export interface IapProduct {
  DEFAULT_LOCALIZED_PRICE: string;
  SKU: string;
}

export const getProductRemoveAdsIap = (): IapProduct => {
  return IS_DEV_MODE ? IAP_PRODUCT_TEST_REMOVE_ADS : IAP_PRODUCT_PROD_REMOVE_ADS;
};

const IAP_PRODUCT_PROD_REMOVE_ADS: IapProduct = {
  DEFAULT_LOCALIZED_PRICE: 'US $1.99',
  SKU: Platform.select({
    android: 'remove_ads',
    ios: 'remove_all_ads',
    default: 'remove_ads',
  }),
};

const IAP_PRODUCT_TEST_REMOVE_ADS: IapProduct = {
  DEFAULT_LOCALIZED_PRICE: 'US $0.01',
  SKU: Platform.select({
    android: 'remove_ads',
    ios: 'remove_all_ads',
    default: 'remove_ads',
  }),
};

export const init = async () => {
  try {
    await Iaphub.init(IS_DEV_MODE ? TEST_OPTIONS : PROD_OPTIONS);
    await Iaphub.setUserId(DeviceInfo.getUniqueId());
    Logger.logMessage('Iaphub has been initialized');
  } catch (error) {
    Logger.logError(error);
  }
};
