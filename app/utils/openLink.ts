import {Alert, Linking} from 'react-native';
import {WEBSITE_URL} from '../config/constants';

export const openAppWebsite = () => openLink(WEBSITE_URL);

export const openLink = async (url: string) => {
  if (await Linking.canOpenURL(url)) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Cannot open this link!');
  }
};
