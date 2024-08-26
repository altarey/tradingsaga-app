import {WebViewMobileMessageMakeSound, WebViewMobileSounds, WebViewWebMessage} from './boardTypes';
import AppSound from '../../utils/appSound';
import Sound from 'react-native-sound';

export const createWebViewWebMessage = (webViewWebMessage: WebViewWebMessage) => JSON.stringify(webViewWebMessage);

const SOUNDS = AppSound.SOUNDS;
export const makeSound = ({sound}: WebViewMobileMessageMakeSound) => {
  let foundSound: Sound | null = null;
  if (sound === WebViewMobileSounds.BUY) foundSound = SOUNDS.BUY;
  if (sound === WebViewMobileSounds.TAP) foundSound = SOUNDS.TAP;
  if (sound === WebViewMobileSounds.COUNTDOWN) foundSound = SOUNDS.COUNTDOWN;
  if (sound === WebViewMobileSounds.COUNTDOWN_COMPLETE) foundSound = SOUNDS.COUNTDOWN_COMPLETE;
  if (sound === WebViewMobileSounds.LOSS) foundSound = SOUNDS.LOSS;
  if (sound === WebViewMobileSounds.NEWS_ALERT) foundSound = SOUNDS.NEWS_ALERT;
  if (sound === WebViewMobileSounds.PROFIT) foundSound = SOUNDS.PROFIT;
  if (sound === WebViewMobileSounds.END_RUN) foundSound = SOUNDS.END_RUN;
  if (sound === WebViewMobileSounds.MEDAL_RECEIVED) foundSound = SOUNDS.MEDAL_RECEIVED;

  if (foundSound === null) return;
  AppSound.play(foundSound);
};
