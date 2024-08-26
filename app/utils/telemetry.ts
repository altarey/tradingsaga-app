import uuid from 'react-native-uuid';
import ButtonName from '../config/buttonsNames';
import {TutorialSteps} from '../contexts/TutorialContext';
import {AdFallbackData} from './telemetry_types';
import analytics from '@react-native-firebase/analytics';
import {IS_TELEMETRY_ENABLED} from '../config/constants';
import {ampInstance} from './amplitude';

const getUID = () => uuid.v4();

export class Telemetry {
  static id = getUID();

  static async emit(event: string, data: any) {
    if (!IS_TELEMETRY_ENABLED) return;
    data = {sessionId: Telemetry.id, ...data};

    const eventName = `ts_${event.toLowerCase()}`;
    ampInstance.logEvent(eventName, data);
    return analytics().logEvent(eventName, data);
  }

  static async logPressButton(buttonName: ButtonName, metadata?: Record<string, any>) {
    return Telemetry.emit('press_button', {button: buttonName, metadata});
  }

  static async logAddTicker(tickerName: string) {
    return Telemetry.emit('add_ticker', {tickerName});
  }

  static async logNextTutorialStep(step: TutorialSteps) {
    return Telemetry.emit('next_tutorial_step', {step});
  }

  static async logChangingAdFallback(data: AdFallbackData) {
    return Telemetry.emit('show_ad_fallback', data);
  }

  static async logIap<T>(event: string, data: T) {
    return Telemetry.emit(`iap_${event}`, data);
  }

  static async logSpeedSelector(data: any) {
    return Telemetry.emit('speed_selector', data);
  }

  static async logError(message?: any, ...optionalParams: any[]) {
    return Telemetry.emit('error', {message: message.toString(), params: optionalParams.toString()});
  }

  static async logBoardWebViewError(message: string) {
    return Telemetry.emit('board_webview_error', {message: message});
  }
}
