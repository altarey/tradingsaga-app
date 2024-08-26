import Sound from 'react-native-sound';

import * as SOUNDS from '../config/sounds';
import {SOUND_EFFECT_DEFAULT_VALUE, SOUND_EFFECT_STORAGE_KEY} from '../config/constants';
import {Logger} from './logger';
import AppAsyncStorage from './appAsyncStorage';

class AppSound {
  static SOUNDS = SOUNDS;
  static isSoundEffectOn = SOUND_EFFECT_DEFAULT_VALUE;

  static play(sound: Sound) {
    if (!AppSound.isSoundEffectOn) return;
    sound.play();
  }

  static forcePlay(sound: Sound) {
    sound.play();
  }

  static async init() {
    try {
      this.isSoundEffectOn = (await AppAsyncStorage.getItemOrDefault(SOUND_EFFECT_STORAGE_KEY, SOUND_EFFECT_DEFAULT_VALUE));
    } catch (e) {
      Logger.logWarning('Error while initialization AppSound', e);
    }
  }
}

export default AppSound;
