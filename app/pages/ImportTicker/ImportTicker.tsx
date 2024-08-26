import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core/lib/typescript/src/types';
import {ParamListBase} from '@react-navigation/routers';

import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {addPlaylistItemAsync, Playlist, TickerDataFile} from '../../tickers';
import {PLAYLIST_BG_COLOR, TICKER_MIN_LENGTH_OF_HISTORY, TICKERS_URL} from '../../config/constants';
import {Routes} from '../../config/routes';
import {incrementPromptDownloads} from '../../components/CustomDialogs/DownloadPromptDialog';
import FullScreenLoadingSpinner from '../../components/FullScreenLoadingSpinner';
import ImportTickerFallback from './ImportTickerFallback';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import {usePlaylist} from '../../contexts/PlaylistContext';
import {IS_iOS} from '../../utils/environment';

interface UseRoute extends RouteProp<ParamListBase, string> {
  params: {
    isNavigatedFromDownloadPrompt: undefined | boolean;
  };
}

const WebTickerDownloadBridge = () => {
  const {navigate} = useNavigation();
  const route = useRoute<UseRoute>();
  const playlist = usePlaylist();
  const webViewRef = useRef<WebView>(null);

  const handleAddTicker = async (ticker: TickerDataFile) => {
    const playlistItemId = Date.now().toString();
    const newAddedPlaylistItemIndex = await addPlaylistItemAsync(playlistItemId, ticker);
    if (route?.params?.isNavigatedFromDownloadPrompt) await incrementPromptDownloads();
    Telemetry.logAddTicker(ticker.name);
    navigate(Routes.PLAYLIST, {initialScrollIndex: newAddedPlaylistItemIndex});
  };

  const sendErrorMessage = (errorMessage: string) => webViewRef?.current?.postMessage(JSON.stringify({errorMessage}));

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;

    if (message === 'cancel') {
      Telemetry.logPressButton(ButtonsNames.ADD_NEW_TICKER_SCREEN_WEBVIEW_CANCEL);
      return navigate(Routes.PLAYLIST);
    }

    Telemetry.logPressButton(ButtonsNames.ADD_NEW_TICKER_SCREEN_WEBVIEW_CONFIRM);

    const newTicker = JSON.parse(message);

    if (newTicker.history.length < TICKER_MIN_LENGTH_OF_HISTORY) {
      sendErrorMessage(
        "Ticker with selected date range doesn't have enough data.\n" +
          'You can try to select another ticket or wider date range.',
      );
      return;
    }

    if (tickerAlreadyExistInPlaylist(playlist!, newTicker)) {
      sendErrorMessage('Ticker with selected date range already exists');
      return;
    }

    await handleAddTicker(newTicker);
  };

  const onLoadEnd = () => {
    if (!IS_iOS) webViewRef.current?.requestFocus();
    // on iOS it doesn't work. requestFocus() crashes
    // in general we don't need to call requestFocus() on iOS, at least for now
  };

  if (playlist === null) return <FullScreenLoadingSpinner />;

  return (
    <WebView
      ref={webViewRef}
      keyboardDisplayRequiresUserAction={false}
      style={styles.webView}
      source={{uri: TICKERS_URL}}
      startInLoadingState={true}
      onLoadEnd={onLoadEnd}
      renderLoading={() => <FullScreenLoadingSpinner />}
      onMessage={handleOnMessage}
      renderError={(...errorDEV) => <ImportTickerFallback webView={webViewRef.current} errorDEV={errorDEV} />}
      onError={() => <ImportTickerFallback webView={webViewRef.current} />}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: PLAYLIST_BG_COLOR,
  },
});

export default WebTickerDownloadBridge;

const tickerAlreadyExistInPlaylist = (playlist: Playlist, ticker: TickerDataFile): boolean =>
  !!playlist.find((playlistItem) => {
    const isTheSameDateRange =
      playlistItem.dateRange.start === ticker.history[0].date &&
      playlistItem.dateRange.end === ticker.history[ticker.history.length - 1].date;
    const isTheSameTicker = playlistItem.ticker === ticker.ticker;

    return isTheSameDateRange && isTheSameTicker;
  });
