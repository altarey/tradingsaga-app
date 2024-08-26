import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {getPlaylistAsync} from '../../tickers';
import {ConfirmationDialog} from './index';
import {useDialogs} from '../../contexts/DialogsContext';
import {Routes} from '../../config/routes';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import AppAsyncStorage from '../../utils/appAsyncStorage';

const MAX_PROMPT_DOWNLOADS = 5;
const MAX_PROMPT_CANCELS = 3;
const MAX_PLAYED_PERCENTAGE_OF_PLAYLIST = 0.66;

const STORAGE_KEY = 'DOWNLOAD_PROMPT_DIALOG';

interface StorageData {
  playCounter: number;
  promptDownloads: number;
  promptCancels: number;
}

async function setInitialStorageData(): Promise<StorageData> {
  const initialData: StorageData = {
    playCounter: 0,
    promptDownloads: 0,
    promptCancels: 0,
  };
  await AppAsyncStorage.setItem(STORAGE_KEY, initialData);
  return initialData;
}

async function getStorageData(): Promise<StorageData> {
  const parsedStorageData = await AppAsyncStorage.getItem<StorageData>(STORAGE_KEY);
  if (!parsedStorageData) return setInitialStorageData();
  return parsedStorageData;
}

type SetStorageDataAction = ((data: StorageData) => Partial<StorageData>) | Partial<StorageData>;

async function setStorageData(action: SetStorageDataAction) {
  const previousStorageData = await getStorageData();
  let newStorageData = typeof action === 'function' ? action(previousStorageData) : action;

  await AppAsyncStorage.setItem(STORAGE_KEY, {...previousStorageData, ...newStorageData});
}

async function shouldSkipDownloadPrompt(): Promise<boolean> {
  const {playCounter, promptDownloads, promptCancels} = await getStorageData();
  const playlist = await getPlaylistAsync();

  if (promptCancels > MAX_PROMPT_CANCELS) return true;
  if (promptDownloads > MAX_PROMPT_DOWNLOADS) return true;

  const playedPercentageOfPlaylist = playCounter / playlist.length;
  return playedPercentageOfPlaylist < MAX_PLAYED_PERCENTAGE_OF_PLAYLIST;
}

export async function incrementPlayCounter() {
  await setStorageData((prevData) => ({playCounter: prevData.playCounter + 1}));
}

export async function incrementPromptDownloads() {
  await setStorageData((prevData) => ({promptDownloads: prevData.promptDownloads + 1}));
}

export async function resetPlayCounter() {
  await setStorageData({playCounter: 0});
}

async function incrementPromptCancels() {
  await setStorageData((prevData) => ({promptCancels: prevData.promptCancels + 1}));
}

interface HandleShowingPromptConfig {
  nextSession: () => void;
  navigation: ReturnType<typeof useNavigation>;
  dialogs: ReturnType<typeof useDialogs>;
}

export async function handleShowingDownloadPrompt(config: HandleShowingPromptConfig) {
  const {nextSession, dialogs, navigation} = config;
  if (await shouldSkipDownloadPrompt()) return nextSession();

  dialogs.render((unmount) => (
    <ConfirmationDialog
      title="Continue practicing"
      content="Would you like to find more stocks, crypto or currency?"
      onCancel={async () => {
        Telemetry.logPressButton(ButtonsNames.BOARD_SCREEN_DIALOG_PROMPT_TO_DOWNLOAD_MORE_TICKERS_CANCEL);
        await incrementPromptCancels();
        await nextSession();
        unmount();
      }}
      onConfirm={() => {
        Telemetry.logPressButton(ButtonsNames.BOARD_SCREEN_DIALOG_PROMPT_TO_DOWNLOAD_MORE_TICKERS_CONFIRM);
        navigation.navigate(Routes.ADD_NEW_TICKER, {isNavigatedFromDownloadPrompt: true});
        unmount();
      }}
    />
  ));
}
