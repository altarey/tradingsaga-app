import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import HelpGameplay from './HelpTabs/HelpGamePlay';
import HelpGlossary from './HelpTabs/HelpGlossary';
import HelpAboutUs from './HelpTabs/HelpAboutUs';
import HelpTab from './HelpComponents/HelpTab';
import Colors from '../../config/colors';
import ButtonsNames from '../../config/buttonsNames';
import {Telemetry} from '../../utils/telemetry';
import AppSound from '../../utils/appSound';
import HelpFeedback from './HelpTabs/HelpFeedback';
import {useNavigation, useRoute} from '@react-navigation/native';
import appScale from '../../utils/appScale';
import {Routes} from '../../config/routes';

export enum TABS_NAMES {
  GAMEPLAY = 'Gameplay',
  VOCABULARY = 'Vocabulary',
  FEEDBACK = 'Feedback',
  ABOUT_US = 'About us',
}

interface Tab {
  Component: React.FC<{setTap?: React.Dispatch<React.SetStateAction<string>>}>;
  name: TABS_NAMES;
  telemetryName:
    | ButtonsNames.HELP_SCREEN_TABS_GAMEPLAY
    | ButtonsNames.HELP_SCREEN_TABS_GLOSSARY
    | ButtonsNames.HELP_SCREEN_TABS_ABOUT_US
    | ButtonsNames.HELP_SCREEN_FEEDBACK;
}

const TABS: Tab[] = [
  {
    Component: HelpGameplay,
    name: TABS_NAMES.GAMEPLAY,
    telemetryName: ButtonsNames.HELP_SCREEN_TABS_GAMEPLAY,
  },
  {
    Component: HelpGlossary,
    name: TABS_NAMES.VOCABULARY,
    telemetryName: ButtonsNames.HELP_SCREEN_TABS_GLOSSARY,
  },
  {
    Component: HelpFeedback,
    name: TABS_NAMES.FEEDBACK,
    telemetryName: ButtonsNames.HELP_SCREEN_FEEDBACK,
  },
  {
    Component: HelpAboutUs,
    name: TABS_NAMES.ABOUT_US,
    telemetryName: ButtonsNames.HELP_SCREEN_TABS_ABOUT_US,
  },
];

const HelpScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialTabName = (route.params as {initialTabName?: string})?.initialTabName ?? TABS[0].name;
  const [tab, setTab] = useState(initialTabName);

  useEffect(() => {
    setTab(initialTabName);
  }, [initialTabName]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.navigationContainer}>
          {TABS.map(({name, telemetryName}) => (
            <HelpTab
              key={name}
              onPress={() => {
                AppSound.play(AppSound.SOUNDS.TAP);
                Telemetry.logPressButton(telemetryName);
                navigation.navigate(Routes.HELP, {initialTabName: name});
                setTab(name);
              }}
              title={name}
              isSelected={tab === name}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>
        {TABS.map(({name, Component}) => (name === tab ? <Component key={name} setTap={setTab}/> : null))}
      </View>
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.MYRTLE.default,
    flex: 1,
  },
  container: {
    flexDirection: 'column',
  },
  navigationContainer: {
    width: '100%',
    minHeight: appScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: appScale(10),
    borderBottomWidth: appScale(2),
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    flex: 1,
    padding: appScale(10),
  },
});
