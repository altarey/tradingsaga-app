import React from 'react';
import {ImageBackground, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import HomeBrand from './HomeComponents/HomeBrand';
import HomeMainMenu from './HomeComponents/HomeMainMenu';
import HomeScreenVersion from './HomeComponents/HomeScreenVersion';

import HomeTNCDialog from './HomeComponents/HomeTNCDialog';
import {HERO_BG} from '../../config/icons';
import HomePlayButton from './HomeComponents/HomePlayButton';
import StartDialogs from './HomeComponents/StartDialogs';
import Banner from '../../components/Ads/Banner';
import {ADMOB_IDS} from '../../config/constants';
import appScale from '../../utils/appScale';

const Home = () => {
  return (
    <ImageBackground style={styles.backgroundImage} source={HERO_BG}>
      <HomeTNCDialog />
      <StartDialogs />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.mainContainer}>
            <HomeBrand />
            <HomePlayButton />
            <HomeMainMenu />

            {/*Absolute position*/}
            <HomeScreenVersion />
          </View>
        </View>
        <Banner position="home_banner" bannerId={ADMOB_IDS.HOME_BANNER} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  safeAreaView: {
    flex: 1,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: appScale(30),
    zIndex: 10,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#000',
    resizeMode: 'contain',
  },
});
