import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import useNextPlaylistItemToPlay from '../../../hooks/useNextPlaylistItemToPlay';
import Colors from '../../../config/colors';
import {RobotoRegular} from '../../../config/fonts';
import {useTutorialPlaylistItemToPlay} from '../../../tickers/tutorialPlaylistItem';
import {useTutorial} from '../../../contexts/TutorialContext';
import appScale from '../../../utils/appScale';

const HomeNextPlaylistItemToPlay: React.FC = () => {
  const tutorial = useTutorial();
  const realPlaylistItem = useNextPlaylistItemToPlay();
  const tutorialPlaylistItem = useTutorialPlaylistItemToPlay();

  let playlistItem = realPlaylistItem;
  if (tutorialPlaylistItem && tutorial.isInProgress) playlistItem = tutorialPlaylistItem;

  return (
    <View style={styles.container}>
      {!!playlistItem && (
        <Text style={styles.text}>
          <Text style={styles.textNext}>Next to play:  </Text>
          <Text style={styles.text}>
            {playlistItem.name} | {playlistItem.label}
          </Text>
        </Text>
      )}
      {!playlistItem && <Text style={styles.text}>Tap to buy, tap to sell!</Text>}
    </View>
  );
};

export default HomeNextPlaylistItemToPlay;

const styles = StyleSheet.create({
  container: {
    marginTop: appScale(4),
    backgroundColor: Colors.BLACK.default,
    padding: appScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: appScale(16),
    fontFamily: RobotoRegular,
    color: Colors.WHITE.default,
  },
  textNext: {
    color: Colors.FESTIVAL.default,
    fontWeight: 'bold',
    marginRight: appScale(6),
    paddingRight: appScale(6),
  },
  iconButtonContainer: {
    marginLeft: 14,
  },
});
