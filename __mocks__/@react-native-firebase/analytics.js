jest.mock('@react-native-firebase/analytics', () => {
  return () => {
    return {
      logEvent: jest.fn(),
      setUserProperties: jest.fn(),
      setUserId: jest.fn(),
      setCurrentScreen: jest.fn(),
    };
  };
});
