jest.mock('@react-native-firebase/crashlytics', () => {
  return () => {
    return {
      setCrashlyticsCollectionEnabled: jest.fn(),
      crash: jest.fn(),
      log: jest.fn(),
      logEvent: jest.fn(),
      setAttributes: jest.fn(),
      setUserId: jest.fn(),
      recordError: jest.fn(),
    };
  };
});
