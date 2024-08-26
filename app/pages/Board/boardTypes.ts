import {NextPlaylistItemToPlayWithHistory} from '../../tickers/playlist/getNextPlaylistItemToPlay';
import {Routes} from '../../config/routes';
import {PlaylistItemRating} from '../../tickers';

export enum WebViewMobileSounds {
  BUY = 'BUY',
  COUNTDOWN = 'COUNTDOWN',
  COUNTDOWN_COMPLETE = 'COUNTDOWN_COMPLETE',
  LOSS  = 'LOSS',
  NEWS_ALERT = 'NEWS_ALERT',
  TAP = 'TAP',
  PROFIT  = 'PROFIT',
  END_RUN = 'END_RUN',
  MEDAL_RECEIVED = 'MEDAL_RECEIVED'
}

// WEB WEBVIEW MESSAGES
export enum WebViewWebMessages {
  INITIALIZE_RUN = 'INITIALIZE_RUN',
  ON_APP_GOES_BACKGROUND = 'ON_APP_GOES_BACKGROUND',
}

export interface WebViewWebMessageInitializeRun {
  message: WebViewWebMessages.INITIALIZE_RUN;
  playlistItem: NextPlaylistItemToPlayWithHistory;
  shouldShowTutorial: boolean;
}

export interface WebViewWebMessageOnAppBackground {
  message: WebViewWebMessages.ON_APP_GOES_BACKGROUND;
}

export type WebViewWebMessage = WebViewWebMessageInitializeRun | WebViewWebMessageOnAppBackground;

// MOBILE WEBVIEW MESSAGES
export enum WebViewMobileMessages {
  FINISH_RUN = 'FINISH_RUN',
  EXIT_RUN = 'EXIT_RUN',
  NAVIGATE_TO = 'NAVIGATE_TO',
  OPEN_LINK = 'OPEN_LINK',
  NEXT_RUN = 'NEXT_RUN',
  SHARE_MESSAGE = 'SHARE_MESSAGE',
  REPLAY_RUN = 'REPLAY_RUN',
  MAKE_SOUND = 'MAKE_SOUND',
  INITIALIZE_RUN = 'INITIALIZE_RUN'
}

export interface WebViewMobileMessageExitRun {
  message: WebViewMobileMessages.EXIT_RUN;
}

export interface WebViewMobileMessageFinishRun {
  message: WebViewMobileMessages.FINISH_RUN;
  playlistItemId: string;
  runRating: PlaylistItemRating;
  tradeReturn: number;
  benchmarkReturn: number;
}

export interface WebViewMobileMessageNavigateTo {
  message: WebViewMobileMessages.NAVIGATE_TO;
  route: Routes;
}

export interface WebViewMobileMessageOpenLink {
  message: WebViewMobileMessages.OPEN_LINK;
  link: string;
}

export interface WebViewMobileMessageNextRun {
  message: WebViewMobileMessages.NEXT_RUN;
}

export interface WebViewMobileMessageReplayRun {
  message: WebViewMobileMessages.REPLAY_RUN;
  playlistItemId: string;
}

export interface WebViewMobileMessageShareMessage {
  message: WebViewMobileMessages.SHARE_MESSAGE;
  shareMessage: string;
}

export interface WebViewMobileMessageMakeSound {
  message: WebViewMobileMessages.MAKE_SOUND;
  sound: WebViewMobileSounds;
}

export interface WebViewMobileMessageInitializeRun {
  message: WebViewMobileMessages.INITIALIZE_RUN;
}

export type WebViewMobileMessage =
  WebViewMobileMessageFinishRun
  | WebViewMobileMessageExitRun
  | WebViewMobileMessageNavigateTo
  | WebViewMobileMessageOpenLink
  | WebViewMobileMessageNextRun
  | WebViewMobileMessageReplayRun
  | WebViewMobileMessageShareMessage
  | WebViewMobileMessageMakeSound
  | WebViewMobileMessageInitializeRun
