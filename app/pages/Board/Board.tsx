import React, {useRef, useState} from 'react';
import WebView, {WebViewProps} from 'react-native-webview';
import uuid from 'react-native-uuid';

import BoardSafeAreaView from './components/BoardSafeAreaView';
import BoardWebView from './components/BoardWebView';

import {
  WebViewMobileMessage,
  WebViewMobileMessageFinishRun,
  WebViewMobileMessageNavigateTo,
  WebViewMobileMessageOpenLink,
  WebViewMobileMessageReplayRun,
  WebViewMobileMessages,
  WebViewMobileMessageShareMessage,
  WebViewWebMessages,
} from './boardTypes';
import {Logger} from '../../utils/logger';
import {createWebViewWebMessage, makeSound} from './boardUtils';
import {
  getNextPlaylistItemToPlayWithHistory,
  NextPlaylistItemToPlayWithHistory,
  saveNextPlaylistItemToPlayIdToStorage,
  setNextPlaylistItemToPlayId,
} from '../../tickers/playlist/getNextPlaylistItemToPlay';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../config/routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';
import {openLink} from '../../utils/openLink';
import useShowFullScreenAds from '../../hooks/useShowFullScreenAds';
import shareSocialMedia from '../../utils/shareSocialMedia';
import {savePlaylistItemRunResults} from '../../tickers/playlist/playlistRating';
import {chooseRandomNews} from '../Playlist/ticker-utils';
import {TickerDataFile} from '../../tickers';
import {useFinishTutorial, useTutorial} from '../../contexts/TutorialContext';
import {
  getTutorialPlaylistItemToPlay,
  TUTORIAL_PLAYLIST_ITEM_ID,
} from '../../tickers/tutorialPlaylistItem';
import useProcessState from '../../hooks/useProcessState';
import moment from 'moment';
import {useAppRate} from '../../contexts/AppRateContext';
import EnjoyThisAppDialog, {RUNS_COUNT_BEFORE_SHOWING_RATE_US} from '../../components/CustomDialogs/EnjoyThisAppDialog';
import DIALOGS_IDS from '../../config/dialogsIds';
import {useDialogs} from '../../contexts/DialogsContext';
import {
  handleShowingDownloadPrompt,
  incrementPlayCounter,
} from '../../components/CustomDialogs/DownloadPromptDialog';

const Board = () => {
  const getNewKey = () => uuid.v4();
  const dialogs = useDialogs();
  const appRate = useAppRate();
  const tutorial = useTutorial();
  const finishTutorial = useFinishTutorial();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const webViewRef = useRef<WebView>(null);
  const {showAd} = useShowFullScreenAds();
  const [webViewKey, setWebViewKey] = useState(getNewKey());

  const postMessage = (message: string) => webViewRef.current?.postMessage(message);

  const onMessage: WebViewProps['onMessage'] = async (event) => {
    const data = event.nativeEvent.data;
    try {
      const parsedData = JSON.parse(data);
      await handleMessage(parsedData);
    } catch {
       Logger.logError('[onMessage]: Cannot handle - ' + data);
    }
  };

  const handleMessage = (message: WebViewMobileMessage) => {
    const handler = ({
      [WebViewMobileMessages.FINISH_RUN]: handleFinishRun,
      [WebViewMobileMessages.EXIT_RUN]: handleExitRun,
      [WebViewMobileMessages.OPEN_LINK]: handleOpenLink,
      [WebViewMobileMessages.NAVIGATE_TO]: handleNavigateTo,
      [WebViewMobileMessages.NEXT_RUN]: handleNextRun,
      [WebViewMobileMessages.SHARE_MESSAGE]: handleShareMessage,
      [WebViewMobileMessages.REPLAY_RUN]: handleReplay,
      [WebViewMobileMessages.MAKE_SOUND]: makeSound,
      [WebViewMobileMessages.INITIALIZE_RUN]: initializeRun,
    })[message.message] as (message: WebViewMobileMessage) => void;

    if (handler) return handler(message);

    Logger.logError('Cannot handle message - ' + message);
  };

  const handleFinishRun = async (message: WebViewMobileMessageFinishRun) => {
    // prevents showing ads and saving results if it's a tutorial run
    if (message.playlistItemId === TUTORIAL_PLAYLIST_ITEM_ID) return;

    // Check if we need to show EnjoyThisApp dialog
    let shouldShow = false;
    appRate.setRunCountToday(appRate.runCountToday + 1);

    if (!appRate.isAppRated) {
      const today = new Date();
      const secondTimeToday = moment(appRate.lastAskToRateUsDate).isSame(today, 'day');
      shouldShow = secondTimeToday && appRate.runCountToday === RUNS_COUNT_BEFORE_SHOWING_RATE_US;
      appRate.setLastAskToRateUsDate(today);
      if (shouldShow) {
        dialogs.render(() => <EnjoyThisAppDialog navigation={navigation}/>, {customId: DIALOGS_IDS.ENJOY_THIS_APP});
      }
    }

    if (!shouldShow) {
        await showAd();
    }

    await setNextPlaylistItemToPlayId();
    await incrementPlayCounter();
    await savePlaylistItemRunResults(message.playlistItemId, message.runRating);
  };

  useProcessState( {
    onBackground: () => {
      const message = createWebViewWebMessage({message: WebViewWebMessages.ON_APP_GOES_BACKGROUND});
      postMessage(message);
    },
  });

  const handleNavigateTo = (message: WebViewMobileMessageNavigateTo) => navigation.navigate(message.route);
  const handleOpenLink = (message: WebViewMobileMessageOpenLink) => openLink(message.link);
  const handleShareMessage = async (message: WebViewMobileMessageShareMessage) => {
    await shareSocialMedia(message.shareMessage);
  };

  const handleReplay = async (message: WebViewMobileMessageReplayRun) => {
    await saveNextPlaylistItemToPlayIdToStorage(message.playlistItemId);
    await webViewRef.current?.reload();
  };

  const initializeRun = async () => {
    if (tutorial.isInProgress) {
      const message = createWebViewWebMessage({
        message: WebViewWebMessages.INITIALIZE_RUN,
        playlistItem: await getTutorialPlaylistItemToPlay() as NextPlaylistItemToPlayWithHistory,
        shouldShowTutorial: true,
      });
      postMessage(message);
      finishTutorial();
      return;
    }

    const playlistItem = await getNextPlaylistItemToPlayWithHistory();
    if (!playlistItem) return;

    const history = await chooseRandomNews<TickerDataFile['history'][0]>(playlistItem.history);

    const message = createWebViewWebMessage({
      message: WebViewWebMessages.INITIALIZE_RUN,
      playlistItem: {
        ...playlistItem,
        history,
      },
      shouldShowTutorial: false,
    });
    postMessage(message);
  };

  const handleNextRun = () =>
    handleShowingDownloadPrompt({
      nextSession: () => webViewRef.current?.reload(),
      navigation,
      dialogs,
    });

  const handleExitRun = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.push(Routes.HOME);
  };

  const reloadWebView = () => {
    webViewRef.current?.reload();
    setWebViewKey(getNewKey());
  };

  return (
    <BoardSafeAreaView>
      <BoardWebView ref={webViewRef} key={`${webViewKey}`} onRetry={reloadWebView} onMessage={onMessage} />
    </BoardSafeAreaView>
  );
};

export default Board;
