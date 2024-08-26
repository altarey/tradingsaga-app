import crashlytics from '@react-native-firebase/crashlytics';

const defaultHandler = ErrorUtils?.getGlobalHandler();

ErrorUtils?.setGlobalHandler((...args) => {
  const [error] = args;
  const crashlyticsInstance = crashlytics();

  if (error && error instanceof Error) {
    crashlyticsInstance.log(`${error}`);
    crashlyticsInstance.log(`${error.stack}`);
    crashlyticsInstance.recordError(error);
  } else {
    // have never gotten this log so far might not be necessary
    crashlyticsInstance.recordError(new Error(`RN Fatal: ${error}`));
  }

  defaultHandler.apply(this, args);
});
