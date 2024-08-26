/**
 |--------------------------------------------------
 | APPLICATION DIFFERENT CONSTANT
 |--------------------------------------------------
 */
import {RATING_HIGH_ICON, RATING_LOW_ICON, RATING_MEDIUM_ICON} from './icons';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {IS_DEV_MODE, IS_iOS} from '../utils/environment';
import appScale from '../utils/appScale';

export const PLAYLIST_BG_COLOR = '#172122';

export const PLAYLIST_MINIMUM_ITEMS_FOR_RATING = 10;

export const PLAYLIST_RATING_SCORE = {
  HIGH: {
    ICON: RATING_HIGH_ICON,
    POINTS: 6,
  },
  MEDIUM: {
    ICON: RATING_MEDIUM_ICON,
    POINTS: 3,
  },
  LOW: {
    ICON: RATING_LOW_ICON,
    POINTS: 1,
  },
  NO_POINTS: {
    ICON: null,
    POINTS: 0,
  },
};

export const ICON_SIZE_DEFAULT = appScale(20);

export const ENABLE_SETTINGS = true;

export const APP_TITLE = 'Trading $aga';
export const SHARE_TITLE = 'Trading $aga';
export const ALTAREY = `ALTAREY LLC`;
export const GAME_SLOGAN = 'Improve your intuition';
export const WEBSITE_URL = 'https://tradingsaga.com';
export const PRIVACY_AND_TERMS_URL = `${WEBSITE_URL}/tnc`;
export const SHARE_FILE_NAME_PREFIX = 'trading-saga';
export const SUPPORT_EMAIL = 'support@tradingsaga.com';
export const TNC_TIME_URL = `${PRIVACY_AND_TERMS_URL}.html`;
export const TNC_URL = `${TNC_TIME_URL}#terms`;
export const PRIVACY_URL = `${TNC_TIME_URL}#privacy`;
export const NEWS_FLASHES_STORAGE_KEY = 'NEWS_ALERT_FLASHES_STORAGE_KEY';
export const NEWS_FLASHES_DEFAULT_VALUE = true;

export const CHANCE_TO_ROLL_OUT_NEWS = 100; // chance to roll-out a news

export const SOUND_EFFECT_STORAGE_KEY = 'SOUND_EFFECT_ON_STORAGE_KEY';
export const SOUND_EFFECT_DEFAULT_VALUE = true;

export const IS_TELEMETRY_ENABLED = true;

export const TNC_STORAGE_KEY = '@local_TNC_Date';

// export const TICKERS_URL = 'http://localhost:9999/;
export const TICKERS_URL = 'https://tickers.tradingsaga.com/';

// export const PWA_URL = 'http://localhost:3000/';
export const PWA_URL = 'https://web-app.tradingsaga.com/';

export const UPDATE_APP_DIALOG = 'UPDATE_APP_DIALOG';

export const FEEDBACK_FORM_URL = 'https://form.jotform.com/212012828424043';

interface AdMobIds {
  HOME_BANNER: string;
  PLAYLIST_BANNER: string;
  FULLSCREEN: string;
  FULLSCREEN_REWARDED: string;
}

// [ANDROID] https://developers.google.com/admob/android/test-ads#demo_ad_units
// [IOS]     https://developers.google.com/admob/ios/test-ads#demo_ad_units
const ADMOB_TEST_PUBLISHER = 'ca-app-pub-3940256099942544';
const ADMOB_TEST_IDS: AdMobIds = {
  HOME_BANNER: Platform.select({
    android: `${ADMOB_TEST_PUBLISHER}/6300978111`,
    ios: `${ADMOB_TEST_PUBLISHER}/2934735716`,
    default: '',
  }),
  PLAYLIST_BANNER: Platform.select({
    android: `${ADMOB_TEST_PUBLISHER}/6300978111`,
    ios: `${ADMOB_TEST_PUBLISHER}/2934735716`,
    default: '',
  }),
  FULLSCREEN: Platform.select({
    android: `${ADMOB_TEST_PUBLISHER}/8691691433`,
    ios: `${ADMOB_TEST_PUBLISHER}/5135589807`,
    default: '',
  }),
  FULLSCREEN_REWARDED: Platform.select({
    android: `${ADMOB_TEST_PUBLISHER}/5224354917`,
    ios: `${ADMOB_TEST_PUBLISHER}/1712485313`,
    default: '',
  }),
};

const ADMOB_REAL_PUBLISHER = 'ca-app-pub-6637003012513941';
const ADMOB_REAL_IDS: AdMobIds = {
  HOME_BANNER: Platform.select({
    android: `${ADMOB_REAL_PUBLISHER}/8665826762`,
    ios: `${ADMOB_REAL_PUBLISHER}/6974514721`,
    default: '',
  }),
  PLAYLIST_BANNER: Platform.select({
    android: `${ADMOB_REAL_PUBLISHER}/1514380468`,
    ios: `${ADMOB_REAL_PUBLISHER}/3035269717`,
    default: '',
  }),
  FULLSCREEN: Platform.select({
    android: `${ADMOB_REAL_PUBLISHER}/7084796568`,
    ios: `${ADMOB_REAL_PUBLISHER}/7378958968`,
    default: '',
  }),
  FULLSCREEN_REWARDED: Platform.select({
    android: `${ADMOB_REAL_PUBLISHER}/5196999822`,
    ios: `${ADMOB_REAL_PUBLISHER}/4186012937`,
    default: '',
  }),
};

export const ADMOB_IDS: AdMobIds = {
  HOME_BANNER: IS_DEV_MODE ? ADMOB_TEST_IDS.HOME_BANNER : ADMOB_REAL_IDS.HOME_BANNER,
  PLAYLIST_BANNER: IS_DEV_MODE ? ADMOB_TEST_IDS.PLAYLIST_BANNER : ADMOB_REAL_IDS.PLAYLIST_BANNER,
  FULLSCREEN: IS_DEV_MODE ? ADMOB_TEST_IDS.FULLSCREEN : ADMOB_REAL_IDS.FULLSCREEN,
  FULLSCREEN_REWARDED: IS_DEV_MODE ? ADMOB_TEST_IDS.FULLSCREEN_REWARDED : ADMOB_REAL_IDS.FULLSCREEN_REWARDED,
};

export const GOOGLE_PACKAGE_NAME = !IS_iOS ? DeviceInfo.getBundleId() : undefined;
export const APPLE_APP_ID = IS_iOS ? '1491133170' : undefined;

export const TICKER_MIN_LENGTH_OF_HISTORY = 30;
export const APP_SCALE_FACTOR = 0.3;

export const DATE_MIN_VALUE = -8640000000000000;
