import {SafeAreaView, ScrollView, StyleSheet, Switch, View} from 'react-native';
import React from 'react';
import SettingsItem from './SettingsItem';
import IconButton from '../../components/common/IconButton';
import {RESTORE_ICON, TRASH_ICON} from '../../config/icons';
import FullScreenLoadingSpinner from '../../components/FullScreenLoadingSpinner';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {
  NEWS_FLASHES_DEFAULT_VALUE,
  SOUND_EFFECT_DEFAULT_VALUE,
  SOUND_EFFECT_STORAGE_KEY,
  NEWS_FLASHES_STORAGE_KEY, ADMOB_IDS,
} from '../../config/constants';
import {useDialogs} from '../../contexts/DialogsContext';
import {ConfirmationDialog} from '../../components/CustomDialogs';
import {deleteAllPlaylistPBs, ensurePlaylistInitialized, purgePlaylist} from '../../tickers';
import Colors from '../../config/colors';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import AppSound from '../../utils/appSound';
import appScale from '../../utils/appScale';
import Banner from '../../components/Ads/Banner';

const ICON_SIZE = appScale(20);

const SettingsScreen: React.FC = () => {
  const dialogs = useDialogs();

  const [isNewsFlashesOn, setIsNewFlashesOn, isNewsFlashesStateReady] = useAsyncStorage(
    NEWS_FLASHES_STORAGE_KEY,
    NEWS_FLASHES_DEFAULT_VALUE,
  );
  const [isSoundEffectOn, setIsSoundEffectOn, isSoundEffectOnStateReady] = useAsyncStorage(
    SOUND_EFFECT_STORAGE_KEY,
    SOUND_EFFECT_DEFAULT_VALUE,
  );

  const handleToggleSoundEffect = (newValue: boolean) => {
    // make sound when turning on
    if (newValue) AppSound.forcePlay(AppSound.SOUNDS.TOGGLE_SWITCH);

    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_SOUND_EFFECT);

    setIsSoundEffectOn(newValue);
    AppSound.isSoundEffectOn = newValue;
  };

  const handleToggleNewsFlashes = (newValue: boolean) => {
    AppSound.play(AppSound.SOUNDS.TOGGLE_SWITCH);
    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_NEWSFLASHES);

    setIsNewFlashesOn(newValue);
  };

  const handleResetRatings = () => {
    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_DELETE_ALL_PBS);
    dialogs.render((unmount) => (
      <ConfirmationDialog
        shouldShowLoader
        title="Reset your Rating"
        content="Proceed to delete all of your played run ratings?"
        loadingMessage="Reset in progress..."
        onCancel={() => {
          Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_DELETE_ALL_PBS_CANCEL);
          unmount();
        }}
        onConfirm={async () => {
          AppSound.play(AppSound.SOUNDS.DELETE);
          Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_DELETE_ALL_PBS_CONFIRM);
          await deleteAllPlaylistPBs();
          unmount();
        }}
      />
    ));
  };

  const handleDeleteAllStockData = () => {
    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_DELETE_ALL_STOCK_DATA);
    dialogs.render((unmount) => (
      <ConfirmationDialog
        shouldShowLoader
        title="Reset your Playlist"
        content="Proceed to delete all of your added tickers to the playlist?"
        loadingMessage="Delete in progress..."
        onCancel={() => {
          Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_DELETE_ALL_STOCK_DATA_CANCEL);
          unmount();
        }}
        onConfirm={async () => {
          AppSound.play(AppSound.SOUNDS.DELETE);
          Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_DELETE_ALL_STOCK_DATA_CONFIRM);
          await purgePlaylist();
          unmount();
        }}
      />
    ));
  };

  const handleRestoreToDefault = () => {
    Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_RESTORE_TO_DEFAULT);
    dialogs.render((unmount) => (
      <ConfirmationDialog
        shouldShowLoader
        title="Reset to 'factory' settings"
        content="Proceed to reset the app to the 'factory' settings?"
        loadingMessage="Resetting in progress..."
        onCancel={() => {
          Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_RESTORE_TO_DEFAULT_CANCEL);
          unmount();
        }}
        onConfirm={async () => {
          AppSound.play(AppSound.SOUNDS.RESTORE_TO_DEFAULT);
          Telemetry.logPressButton(ButtonsNames.SETTINGS_SCREEN_RESTORE_TO_DEFAULT_CONFIRM);
          await deleteAllPlaylistPBs();
          await purgePlaylist();
          await ensurePlaylistInitialized();
          setIsNewFlashesOn(NEWS_FLASHES_DEFAULT_VALUE);
          setIsSoundEffectOn(SOUND_EFFECT_DEFAULT_VALUE);
          unmount();
        }}
      />
    ));
  };

  if (!isNewsFlashesStateReady ||
      !isSoundEffectOnStateReady) {
    return <FullScreenLoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.settingsList}>
          <SettingsItem
            title="Sound Effects"
            subtitle="Toggle to turn on/off"
            rightContent={
              <Switch style={styles.switch} value={isSoundEffectOn} onValueChange={handleToggleSoundEffect} />
            }
          />
          <SettingsItem
            title="News Alerts"
            subtitle="Toggle to turn on/off"
            rightContent={
              <Switch style={styles.switch} value={isNewsFlashesOn} onValueChange={handleToggleNewsFlashes} />
            }
          />
          <SettingsItem
            title="Reset your ratings"
            subtitle="Deletes saved personal best for runs you've completed"
            rightContent={<IconButton onPress={handleResetRatings} iconSize={ICON_SIZE} source={TRASH_ICON} />}
          />
          <SettingsItem
            title="Reset your entire playlist"
            subtitle="Deletes all installed tickers, and resets your earned ratings"
            rightContent={<IconButton onPress={handleDeleteAllStockData} iconSize={ICON_SIZE} source={TRASH_ICON} />}
          />
          <SettingsItem
            title="Reset to 'factory' settings"
            subtitle="Restore the game into the default state. It will reset your settings and reset the playlist"
            rightContent={<IconButton onPress={handleRestoreToDefault} iconSize={ICON_SIZE} source={RESTORE_ICON} />}
          />
        </ScrollView>
        <Banner position="home_banner" bannerId={ADMOB_IDS.HOME_BANNER} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.MYRTLE.default,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: appScale(10),
  },
  settingsList: {
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'stretch',
    flexDirection: 'column',
    marginTop: appScale(10),
  },
  switch: {
    right: appScale(-16),
    transform: [{scaleX: appScale(0.8)}, {scaleY: appScale(0.8)}],
  },
});
