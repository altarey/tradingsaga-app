import {useEffect, useRef, useState} from 'react';
import {
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  FirebaseAdMobTypes,
} from '@react-native-firebase/admob';
import RewardedAdReward = FirebaseAdMobTypes.RewardedAdReward;
import {ADMOB_IDS} from '../config/constants';
import {Logger} from '../utils/logger';
import useShowAdsFullScreenFallbacks from './useShowAdsFullScreenFallbacks';
import {useAppStore} from '../contexts/AppStore';

export enum AdTypes {
  REWARDED = 'REWARDED',
  INTERSTITIAL = 'INTERSTITIAL',
}

const ADS_TYPES = [AdTypes.REWARDED, AdTypes.INTERSTITIAL];
const ADS_KEYWORDS = ['stocks', 'investments', 'crypto', 'bitcoin', 'ethereum', 'shiba', 'dogecoin', 'robinhood', 'etoro', 'fidelity', 'finance', 'game'];

const useShowFullScreenAds = () => {
  const showAdsFullScreenFallbacks = useShowAdsFullScreenFallbacks();
  const appStore = useAppStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdShowing, setIsAdShowing] = useState(false);
  const [nextAddType, setNextAdType] = useState(ADS_TYPES[1]);

  const rewardedAd = useRef(
    RewardedAd.createForAdRequest(ADMOB_IDS.FULLSCREEN_REWARDED, {
      requestNonPersonalizedAdsOnly: false,
      keywords: ADS_KEYWORDS,
    }),
  ).current;

  const interstitialAd = useRef(
    InterstitialAd.createForAdRequest(ADMOB_IDS.FULLSCREEN, {
      requestNonPersonalizedAdsOnly: false,
      keywords: ADS_KEYWORDS,
    }),
  ).current;

  const onEarnedReward = (reward: RewardedAdReward) => reward;

  const getNextAds = () => {
    const currentAdIndex = ADS_TYPES.findIndex((type) => type === nextAddType);

    if (currentAdIndex >= ADS_TYPES.length - 1) return ADS_TYPES[0];

    return ADS_TYPES[currentAdIndex + 1];
  };

  const adsEventListeners = (
    eventType: string,
    error: Error | undefined,
    reward: FirebaseAdMobTypes.RewardedAdReward,
  ) => {
    switch (eventType) {
      case AdEventType.LOADED:
      case RewardedAdEventType.LOADED:
        setIsLoaded(true);
        break;
      case AdEventType.CLOSED:
        interstitialAd.load();
        rewardedAd.load();
        break;
      case RewardedAdEventType.EARNED_REWARD:
        onEarnedReward(reward);
        break;
    }
    if (error) {
      interstitialAd.load();
      rewardedAd.load();
    }
  };

  useEffect(() => {
    const interstitialListener = interstitialAd.onAdEvent(adsEventListeners);
    const rewardedListener = rewardedAd.onAdEvent(adsEventListeners);

    rewardedAd.load();
    interstitialAd.load();

    return () => {
      interstitialListener();
      rewardedListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interstitialAd, rewardedAd]);

  const showAd = async () => {
    if (appStore.noAds) return;
    setNextAdType(getNextAds());
    setIsAdShowing(true);

    try {
      if (isLoaded) {
        nextAddType === AdTypes.REWARDED
            ? await rewardedAd.show()
            : await interstitialAd.show();
      } else {
        showAdsFullScreenFallbacks(() => {
          setIsAdShowing(false);
        });
      }
      // to prevent back back event press in appState
      setTimeout(() => setIsAdShowing(false), 5000);
    } catch (e) {
      showAdsFullScreenFallbacks(() => {
        setIsAdShowing(false);
      });
      Logger.logError(e);
    }
  };

  useEffect(() => {
    if (!isAdShowing) {
      rewardedAd.load();
      interstitialAd.load();
    }
  }, [interstitialAd, isAdShowing, rewardedAd]);

  return {isLoaded, isAdShowing, showAd, onEarnedReward};
};

export default useShowFullScreenAds;
