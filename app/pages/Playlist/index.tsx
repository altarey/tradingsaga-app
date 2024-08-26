import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import TickersEmptyPlaylist from './TickersEmptyPlaylist';
import {ADMOB_IDS, PLAYLIST_BG_COLOR} from '../../config/constants';
import FullScreenLoadingSpinner from '../../components/FullScreenLoadingSpinner';
import TickersPlaylist from './TickersPlaylist';
import TickersPlaylistTutorialBeforeRun from './TickersPlaylistTutorialBeforeRun';
import Banner from '../../components/Ads/Banner';
import {usePlaylist} from '../../contexts/PlaylistContext';
import TickersPlaylistTutorialSelect from './TickersPlaylistTutorialSelect';

const TickersSelector = () => {
  const playlist = usePlaylist();

  if (!playlist) return <FullScreenLoadingSpinner />;
  if (playlist.length === 0) return <TickersEmptyPlaylist />;

  return <TickersPlaylist playlist={playlist} />;
};

const tickersWrapper = (Component: React.ComponentType) => () =>
  (
    <>
      <TickersPlaylistTutorialBeforeRun />
      <TickersPlaylistTutorialSelect />
      <SafeAreaView style={styles.wrapper}>
        <StatusBar hidden />
        <Component />
        <Banner position="playlist_banner" bannerId={ADMOB_IDS.PLAYLIST_BANNER} />
      </SafeAreaView>
    </>
  );

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: PLAYLIST_BG_COLOR,
  },
});

export default tickersWrapper(TickersSelector);
