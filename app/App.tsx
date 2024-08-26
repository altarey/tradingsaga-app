import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {firebase} from '@react-native-firebase/analytics';
import './utils/amplitude';
import './config/appSetup';

import AppPages from './pages';
import {onStart} from './onStart';
import AppContext from './contexts/AppContext';
import crashlytics from '@react-native-firebase/crashlytics';
import './utils/analytics/crashlyticsHandler';
import {IS_DEV_MODE} from './utils/environment';
import {IS_TELEMETRY_ENABLED} from './config/constants';

async function OnStart() {
  const startDate = Date.now();
  await firebase.analytics().setAnalyticsCollectionEnabled(IS_TELEMETRY_ENABLED); // by default analytics is disabled. It's needed to enable in prod
  if (IS_DEV_MODE) {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning:'];
  } else {
    await crashlytics().setCrashlyticsCollectionEnabled(true);
  }

  await Promise.all(onStart.map((s) => s()));

  //TODO: this is where TNC dialog data should load - before hiding splashscreen
  // Hide splash screen

  if (IS_DEV_MODE) SplashScreen.hide();
  else setTimeout(() => SplashScreen.hide(), Math.max(2000 - (Date.now() - startDate), 0)); // Hide splashscreen after 2 seconds or till everything is loaded
}

export default function App() {
  useEffect(() => {
    //invoked only once
    OnStart();
  }, []);

  return (
    <AppContext>
      <AppPages />
    </AppContext>
  );
}
