import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {movePlaylistItem, Playlist, PlaylistItem, removePlaylistItemAsync} from '../../tickers';
import {Telemetry} from '../../utils/telemetry';
import {Routes} from '../../config/routes';
import TickersNavbarRight, {TickersNavBarRightEditing} from './TickersNavbar/TickersNavbarRight';
import {calculatePlaylistRating} from '../../tickers/playlist/playlistRating';
import TickersPlaylistItem, {CONTAINER_HEIGHT as PLAYLIST_ITEM_HEIGHT} from './TickersPlaylistItem';
import TickersPlaylistHeadItem from './TickersPlaylistHeadItem';
import {useDialogs} from '../../contexts/DialogsContext';
import {ConfirmationDialog} from '../../components/CustomDialogs';
import {saveNextPlaylistItemToPlayIdToStorage} from '../../tickers/playlist/getNextPlaylistItemToPlay';
import {TutorialSteps, useTutorial, useTutorialNextStepDisabled} from '../../contexts/TutorialContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';
import ButtonsNames from '../../config/buttonsNames';
import AppSound from '../../utils/appSound';
import useNextPlaylistItemToPlay from '../../hooks/useNextPlaylistItemToPlay';
import TickersPlaylistAddTicker from './TickersPlaylistAddTicker';

interface TickersPlaylistProps {
  playlist: Playlist;
}
const TickersPlaylist = ({playlist}: TickersPlaylistProps) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const nextPlaylistItemToPlay = useNextPlaylistItemToPlay();
  const tutorialNextStepDisabled = useTutorialNextStepDisabled();
  const flatListRef = useRef<FlatList<PlaylistItem>>(null);
  const stateRef = useRef({
    previousJustAddedIndex: -1,
    isScrolledToNext: false,
  });
  const route = useRoute();
  const justAddedIndex = (route.params as {initialScrollIndex?: number})?.initialScrollIndex;

  const tutorial = useTutorial();
  const tutorialBeforeRun = tutorial.shouldBeDisabled(TutorialSteps.PLAYLIST_BEFORE_RUN);

  const [selectedPlaylistItem, setSelectedPlaylistItem] = useState<PlaylistItem | null>(null);
  const dialogs = useDialogs();
  const playlistRating = useMemo(() => calculatePlaylistRating(playlist), [playlist]);

  useEffect(() => {
    tutorialNextStepDisabled.next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial.step]);


  const handleStartRun = async (playlistItemId: string) => {
    AppSound.play(AppSound.SOUNDS.TAP);
    if (tutorial.isInProgress) {
      tutorial.setStep(TutorialSteps.BOARD_SCREEN_BEFORE_RUN_MESSAGE_ABOUT_STOCK);
      if (playlist.length) await saveNextPlaylistItemToPlayIdToStorage(playlist[0].playlistItemId);
      return navigation.replace(Routes.BOARD, undefined);
    }

    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_PLAY_ITEM);
    await saveNextPlaylistItemToPlayIdToStorage(playlistItemId);
    navigation.navigate(Routes.BOARD);
  };

  const clearSelectedPlaylistItem = () => {
    setSelectedPlaylistItem(null);
    navigation.setOptions({
      headerRight: () => <TickersNavbarRight />,
    });
  };

  const handleDeletePlaylistItem = (playlistItem: PlaylistItem) => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_DELETE);
    const {playlistItemId, name, label} = playlistItem;
    const title = 'Remove ticker?';
    const content = `Would you like to remove '[${name}] ${label}'?`;
    dialogs.render((unmount) => (
      <ConfirmationDialog
        title={title}
        content={content}
        onCancel={() => {
          Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_DELETE_DIALOG_CANCEL);
          unmount();
        }}
        onConfirm={async () => {
          Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_DELETE_DIALOG_CONFIRM);
          await removePlaylistItemAsync(playlistItemId);
          clearSelectedPlaylistItem();
          unmount();
        }}
      />
    ));
  };

  const scrollToByItem = (item: PlaylistItem) => {
    if (!flatListRef.current) return;
    flatListRef.current.scrollToItem({item, animated: true});
  };

  const scrollToByIndex = (index: number) => {
    if (!flatListRef.current) return;
    flatListRef.current.scrollToIndex({index, viewPosition: 0.5});
  };

  const selectPlaylistItem = (playlistItem: PlaylistItem) => {
    AppSound.play(AppSound.SOUNDS.TAP);
    if (tutorial.isInProgress) return;
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_SELECT_ITEM);
    if (selectedPlaylistItem?.playlistItemId === playlistItem.playlistItemId) return clearSelectedPlaylistItem();
    setSelectedPlaylistItem(playlistItem);

    navigation.setOptions({
      headerRight: () => (
        <TickersNavBarRightEditing
          onDelete={() => handleDeletePlaylistItem(playlistItem)}
          onMoveUp={() => movePlaylistItem(playlistItem, -1, scrollToByIndex)}
          onMoveDown={() => movePlaylistItem(playlistItem, 1, scrollToByIndex)}
        />
      ),
    });
  };

  const renderItem = ({item, index}: ListRenderItemInfo<PlaylistItem>) => {
    if (tutorial.isDone && justAddedIndex === index && justAddedIndex !== stateRef.current.previousJustAddedIndex) {
      stateRef.current.previousJustAddedIndex = justAddedIndex;
      stateRef.current.isScrolledToNext = true;
      scrollToByItem(item);
    }

    if (
      tutorial.isDone
      && item.playlistItemId === nextPlaylistItemToPlay?.playlistItemId
      && !stateRef.current.isScrolledToNext
      && stateRef.current.previousJustAddedIndex === -1
    ) {
      stateRef.current.isScrolledToNext = true;
      scrollToByItem(item);
    }

    return (
      <TickersPlaylistItem
        nextToPlay={tutorial.isDone && item.playlistItemId === nextPlaylistItemToPlay?.playlistItemId}
        hasJustAdded={tutorial.isDone && index === stateRef.current.previousJustAddedIndex}
        isDisabled={(tutorial.isInProgress && index !== 0) || tutorialBeforeRun || tutorialNextStepDisabled.disabled}
        isHighlighted={tutorial.isInProgress && !tutorialBeforeRun && index === 0}
        key={item.playlistItemId}
        playlistItem={item}
        selectPlaylistItem={selectPlaylistItem}
        selectedPlaylistItem={selectedPlaylistItem}
        startRun={() => handleStartRun(item.playlistItemId)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TickersPlaylistHeadItem playlistRating={playlistRating} />
      <FlatList
        scrollEnabled={!tutorial.isInProgress}
        ref={flatListRef}
        data={playlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.playlistItemId}
        getItemLayout={(_, index) => ({length: 0, offset: PLAYLIST_ITEM_HEIGHT * index, index})}
      />
      {!tutorial.isInProgress && (
        <TickersPlaylistAddTicker />
      )}
    </View>
  );
};

export default TickersPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
