/**
 * @format
 */

import React from 'react';
import App from '../app/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

it('renders correctly', () => {
  renderer.create(<App />);
});
