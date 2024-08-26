import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import BannerFallback from './BannerFallback';
import {useTutorial} from '../../contexts/TutorialContext';
import {AdFallbackPositions} from '../../config/adFallbacks';
import appScale from '../../utils/appScale';
import {useAppStore} from '../../contexts/AppStore';
import BannerLoading from './BannerLoading';
import {IS_iOS} from '../../utils/environment';

const BANNER_HEIGHT = appScale(Platform.select({ios: 40, android: 55, default: 40}));

interface BannerProps {
  bannerId: string;
  position: AdFallbackPositions;
}

const Banner: React.FC<BannerProps> = ({bannerId, position}) => {
  const tutorial = useTutorial();
  const appStore = useAppStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  if (appStore.noAds || tutorial.isInProgress) return null;

  return (
    <View style={styles.container}>
      {!(isLoaded || isFailed) && <BannerLoading />}
      {(isFailed) && <BannerFallback position={position} />}
      {!isFailed && (
        <BannerAd
          unitId={bannerId}
          size={IS_iOS ? BannerAdSize.SMART_BANNER : BannerAdSize.ADAPTIVE_BANNER}
          onAdLoaded={() => setIsLoaded(true)}
          onAdFailedToLoad={() => setIsFailed(true)}
          onAdClosed={() => {}}
          onAdLeftApplication={() => {}}
          onAdOpened={() => {}}
        />
      )}
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
    height: BANNER_HEIGHT,
    minHeight: BANNER_HEIGHT,
    marginTop: appScale(6),
  },
});
