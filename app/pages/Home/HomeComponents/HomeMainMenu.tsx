import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Telemetry} from '../../../utils/telemetry';
import {useNavigation} from '@react-navigation/native';
import {PLAYLIST_HOME_ICON, NO_ADS_ICON, SETTINGS_HOME_ICON, HOME_HELP_ICON} from '../../../config/icons';
import {Routes} from '../../../config/routes';
import {TutorialSteps, useTutorial, useTutorialNextStepDisabled} from '../../../contexts/TutorialContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';
import TutorialContent from '../../../components/Tutorial/TutorialContent';
import TutorialTriangle from '../../../components/Tutorial/TutorialTriangle';
import TutorialText from '../../../components/Tutorial/TutorialText';
import ButtonsNames from '../../../config/buttonsNames';
import IconButton from '../../../components/common/IconButton';
import DIALOGS_IDS from '../../../config/dialogsIds';
import {useDialogs} from '../../../contexts/DialogsContext';
import TutorialLabel from '../../../components/Tutorial/TutorialLabel';
import TutorialLabelVerticalContainer from '../../../components/Tutorial/TutorialLabelVerticalContainer';
import TutorialConfig from '../../../components/Tutorial/TutorialConfig';
import appScale from '../../../utils/appScale';
import {RemoveAdsDialog} from '../../../components/Ads/RemoveAdsDialog';
import {useAppStore} from '../../../contexts/AppStore';

const ICON_SIZE = appScale(50);
const TUTORIAL_LABEL_TOP = appScale(-30);

const HomeMainMenu: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const tutorial = useTutorial();
  const dialogs = useDialogs();
  const tutorialNextStepDisabled = useTutorialNextStepDisabled();
  const appStore = useAppStore();

  const handleNavigateToPlaylist = () => {
    if (tutorial.isInProgress) {
      tutorial.setStep(TutorialSteps.PLAYLIST_SELECT);
      dialogs.unmount(DIALOGS_IDS.TUTORIAL);
      navigation.replace(Routes.PLAYLIST, undefined);
      return;
    }

    Telemetry.logPressButton(ButtonsNames.HOME_SCREEN_PLAYLIST);
    navigation.navigate(Routes.PLAYLIST);
  };

  const handleNavigateToSettings = () => {
    Telemetry.logPressButton(ButtonsNames.HOME_SCREEN_SETTINGS);

    navigation.navigate(Routes.SETTINGS);
  };

  const handleNavigateToHelpScreen = () => {
    Telemetry.logPressButton(ButtonsNames.HOME_SCREEN_HELP);

    navigation.navigate(Routes.HELP);
  };

  const handleNoAdsDialog = () => dialogs.render(() =>  <RemoveAdsDialog />, {customId: DIALOGS_IDS.REMOVE_ADS});

  const isTutorialMode = tutorial.shouldShowTooltip(TutorialSteps.HOME_SCREEN);

  return (
    <>
      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
          {isTutorialMode && (
            <TutorialContent style={styles.playlistTutorialContentMainMenu}>
              <TutorialTriangle style={styles.playlistTutorialTriangleMainMenu} isAction />
              <TutorialText isAction>View your playlist</TutorialText>
            </TutorialContent>
          )}
          <IconButton
            source={PLAYLIST_HOME_ICON}
            onPress={handleNavigateToPlaylist}
            disabled={tutorialNextStepDisabled.disabled || tutorial.shouldBeDisabled(TutorialSteps.HOME_SCREEN)}
            containerStyle={styles.smallBtn}
            iconSize={ICON_SIZE}
            disableTintColor={tutorial.isInProgress}
          />
        </View>

        <View style={styles.buttonContainer}>
          {isTutorialMode && (
            <TutorialLabelVerticalContainer top={TUTORIAL_LABEL_TOP}>
              <TutorialLabel label="Settings" />
            </TutorialLabelVerticalContainer>
          )}
          <IconButton
            source={SETTINGS_HOME_ICON}
            onPress={handleNavigateToSettings}
            disabled={tutorial.isInProgress}
            iconSize={ICON_SIZE}
            containerStyle={styles.smallBtn}
            disableTintColor={tutorial.isInProgress}
          />
        </View>
        <View style={styles.buttonContainer}>
          {isTutorialMode && (
            <TutorialLabelVerticalContainer top={TUTORIAL_LABEL_TOP}>
              <TutorialLabel label="Help" />
            </TutorialLabelVerticalContainer>
          )}
          <IconButton
            source={HOME_HELP_ICON}
            onPress={handleNavigateToHelpScreen}
            disabled={tutorial.isInProgress}
            iconSize={ICON_SIZE}
            containerStyle={styles.smallBtn}
            disableTintColor={tutorial.isInProgress}
          />
        </View>
        {!appStore.noAds && (
          <View style={styles.buttonContainer}>
            {isTutorialMode && (
              <TutorialLabelVerticalContainer top={TUTORIAL_LABEL_TOP}>
                <TutorialLabel label="No Ads" />
              </TutorialLabelVerticalContainer>
            )}
            <IconButton
              source={NO_ADS_ICON}
              onPress={handleNoAdsDialog}
              disabled={tutorial.isInProgress}
              containerStyle={styles.smallBtn}
              iconSize={ICON_SIZE}
              disableTintColor={tutorial.isInProgress}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default HomeMainMenu;

const styles = StyleSheet.create({
  buttonView: {
    marginBottom: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
    height: ICON_SIZE + appScale(20),
  },
  buttonContainer: {
    marginHorizontal: appScale(26),
  },
  smallBtn: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  playlistTutorialContentMainMenu: {
    position: 'absolute',
    zIndex: 1,
    width: appScale(160),
    left: appScale(-140),
    top: appScale(-50),
    padding: appScale(4),
    borderColor: TutorialConfig.ACTION_CONTAINER_BORDER_COLOR,
  },
  playlistTutorialTriangleMainMenu: {
    position: 'absolute',
    right: appScale(-5),
    bottom: appScale(-15),
    transform: [{rotate: '165deg'}],
  },
});
