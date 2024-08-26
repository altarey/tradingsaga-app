import React from 'react';

import {useDialogs} from '../contexts/DialogsContext';
import useGetNextAdsFallback from './useGetNextAdsFallback';

import DIALOGS_IDS from '../config/dialogsIds';
import FullScreenAds from '../components/Ads/FullScreenAds';
import {Telemetry} from '../utils/telemetry';
import {AdFallbackData} from '../utils/telemetry_types';

const useShowAdsFullScreenFallbacks = () => {
  const dialogs = useDialogs();
  const getRandomAdsFallback = useGetNextAdsFallback();

  const performShowing = (onFinish: () => void) => {
    const randomAdsFallback = getRandomAdsFallback();
    const telemetryData: AdFallbackData = {
      type: 'fullscreen',
      name: randomAdsFallback.name,
      position: 'board_end_run_full_screen',
      action: 'shown',
    };
    Telemetry.logChangingAdFallback(telemetryData);

    dialogs.render(
      (unmount) => (
        <FullScreenAds
          source={randomAdsFallback.fullscreen}
          onPress={() => {
            unmount();
            onFinish();
            randomAdsFallback.handler();
            Telemetry.logChangingAdFallback({...telemetryData, action: 'pressed'});
          }}
          onExit={() => {
            unmount();
            onFinish();
          }}
        />
      ),
      {customId: DIALOGS_IDS.BOARD_FULL_SCREEN_ADS_FALLBACKS},
    );
  };

  return performShowing;
};

export default useShowAdsFullScreenFallbacks;
