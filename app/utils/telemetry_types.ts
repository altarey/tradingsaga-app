import {AdFallbackNames, AdFallbackPositions, AdFallbackTypes} from '../config/adFallbacks';

export interface AdFallbackData {
  position: AdFallbackPositions;
  type: AdFallbackTypes;
  name: AdFallbackNames;
  action: 'shown' | 'pressed';
}

export interface OnStartPlayingTickerData {
  tickerName: string;
  amountOfChosenNews: number;
}
