// Without it Iaphub causes tests to fail
import 'isomorphic-fetch';
// @ts-ignore
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-sound', () => {
  class SoundMock {
    constructor(private path: string, private type: string, private callback: () => void) {}
    play = () => jest.fn();
  }
  return SoundMock;
});

jest.mock('@amplitude/react-native', () => {
  const AmplitudeMock = {
    getInstance: jest.fn().mockReturnThis(),
    init: jest.fn().mockReturnValue(true),
    logEvent: jest.fn().mockReturnValue(true),
    setLibraryName: jest.fn().mockReturnValue(true),
  };

  return {Amplitude: AmplitudeMock};
});

jest.useFakeTimers();
