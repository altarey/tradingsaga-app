import Rate, {AndroidMarket, IConfig} from 'react-native-rate';
import {APPLE_APP_ID, GOOGLE_PACKAGE_NAME, WEBSITE_URL} from '../config/constants';
import {Platform} from 'react-native';

const options: IConfig = {
  AppleAppID: APPLE_APP_ID,
  GooglePackageName: GOOGLE_PACKAGE_NAME,
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: Platform.select({ios: true, default: false}),
  openAppStoreIfInAppFails: true,
  inAppDelay: 0.0,
  fallbackPlatformURL: `${WEBSITE_URL}/feedback`,
};

const rateUs = (callback: (success: boolean) => void) => {
  Rate.rate(options, callback);
};

export default rateUs;
