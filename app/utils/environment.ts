import {Platform} from 'react-native';

export const IS_iOS = Platform.OS === 'ios';
export const IS_DEV_MODE = process.env.NODE_ENV === 'development';
export const IS_iOS_RELEASE_MODE = IS_iOS && !IS_DEV_MODE;
