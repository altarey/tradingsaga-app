import {StyleSheet, View} from 'react-native';
import {Routes} from '../../../config/routes';
import React from 'react';
import NavbarIcon from '../../../components/Navigation/NavbarIcon';
import {
  ADD_MORE_ICON,
  DELETE_ICON,
  MOVE_DOWN_ICON,
  MOVE_UP_ICON,
  SETTINGS_ICON,
  SHARE_ICON,
  QUESTION_ICON,
} from '../../../config/icons';
import {useTutorial} from '../../../contexts/TutorialContext';
import {useNavigation} from '@react-navigation/native';
import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import {usePlaylist} from '../../../contexts/PlaylistContext';
import sharePlaylistResults from '../../../utils/playlist/sharePlaylistResults';
import appScale from '../../../utils/appScale';

const TickersNavbarRight: React.FC = () => {
  const navigation = useNavigation();
  const tutorial = useTutorial();
  const playlist = usePlaylist();

  const handleAddMoreButtonPress = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_ADD_NEW);
    navigation.navigate(Routes.ADD_NEW_TICKER);
  };

  const handleSettingsButtonPress = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_SETTINGS);
    navigation.navigate(Routes.SETTINGS);
  };

  const handleNavigateToHelp = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_HELP);
    navigation.navigate(Routes.HELP);
  };

  const handleSharePlaylistResults = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_SHARE);
    sharePlaylistResults(playlist ?? []);
  };

  return (
    <View style={styles.wrapper}>
      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={ADD_MORE_ICON}
        onPress={handleAddMoreButtonPress}
      />
      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={SETTINGS_ICON}
        onPress={handleSettingsButtonPress}
      />
      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={QUESTION_ICON}
        onPress={handleNavigateToHelp}
      />

      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={SHARE_ICON}
        onPress={handleSharePlaylistResults}
      />
    </View>
  );
};

interface TickersNavBarRightEditingProps {
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const TickersNavBarRightEditing: React.FC<TickersNavBarRightEditingProps> = ({
  onMoveUp,
  onDelete,
  onMoveDown,
}) => {
  const tutorial = useTutorial();

  const handleOnMoveUp = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_MOVE_UP);
    onMoveUp();
  };

  const handleOnDelete = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_DELETE);
    onDelete();
  };

  const handleOnMoveDown = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_NAVBAR_MOVE_DOWN);
    onMoveDown();
  };

  return (
    <View style={styles.wrapper}>
      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={MOVE_UP_ICON}
        onPress={handleOnMoveUp}
      />
      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={DELETE_ICON}
        onPress={handleOnDelete}
      />
      <NavbarIcon
        isDisabled={tutorial.isInProgress}
        source={MOVE_DOWN_ICON}
        onPress={handleOnMoveDown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: appScale(10),
  },
});

export default TickersNavbarRight;
