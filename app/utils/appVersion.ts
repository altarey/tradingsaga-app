import DeviceInfo from 'react-native-device-info';
import {WEBSITE_URL} from '../config/constants';
import {Logger} from './logger';
const APP_VERSION_URL = `${WEBSITE_URL}/version.json`;

export const appVersion2 = () => `v${appVersion()}`;

export const appVersion = () => {
  const version = DeviceInfo.getVersion();
  return extractValidVersion(version) ?? version;
};

export const getRemoteAppVersion = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(APP_VERSION_URL);
    const json = await response.json();
    if (!json?.appVersion) {
      Logger.logWarning('No AppVersion in JSON - ' + APP_VERSION_URL);
      return;
    }
    return json.appVersion;
  } catch (e) {
    Logger.logWarning('Error while fetching JSON for appVersion', e);
  }
};

const extractValidVersion = (version: string) => {
  const result = version.match(/^(?:\d+|\*)(?:\.(?:\d+|\*))*/);

  if (result === null) return null;
  return result[0];
};
