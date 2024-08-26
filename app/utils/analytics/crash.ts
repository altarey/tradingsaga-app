import crashlytics from '@react-native-firebase/crashlytics';

export function forceCrash(jsCrash: boolean = false) {
  if (jsCrash) {
    // @ts-ignore
    undefinedVariable.notAFunction();
  } else {
    crashlytics().log('Test Crash');
    crashlytics().crash();
  }
}
