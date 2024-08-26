import React, {useMemo} from 'react';
import {ImageSourcePropType} from 'react-native';

import {
  AdFallbackNames,
  ADS_FALLBACK_BANNER,
  ADS_FALLBACK_FULLSCREEN,
  VISIT_WEBSITE_BANNER,
  VISIT_WEBSITE_FULLSCREEN,
} from '../config/adFallbacks';

import {openAppWebsite} from '../utils/openLink';
import {useDialogs} from '../contexts/DialogsContext';
import DIALOGS_IDS from '../config/dialogsIds';
import RemoveAdsDialog from '../components/Ads/RemoveAdsDialog';

export interface AdFallback {
  handler: () => void;
  fullscreen: ImageSourcePropType;
  banner: ImageSourcePropType;
  name: AdFallbackNames;
}

let index = 0;

const useGetNextAdsFallback = () => {
  const dialogs = useDialogs();
  const listOfFallbacks = useMemo(() => {
    const list: AdFallback[] = [];

      list.push({
        banner: ADS_FALLBACK_BANNER,
        fullscreen: ADS_FALLBACK_FULLSCREEN,
        handler: () => dialogs.render(() => <RemoveAdsDialog />, {customId: DIALOGS_IDS.REMOVE_ADS}),
        name: 'ad_fallback',
      });

    list.push({
      banner: VISIT_WEBSITE_BANNER,
      fullscreen: VISIT_WEBSITE_FULLSCREEN,
      handler: openAppWebsite,
      name: 'visit_website',
    });

    return list;
  }, [dialogs]);

  const handleGetNext = (): AdFallback => {
    const item = listOfFallbacks[index];
    index++;
    if (index > listOfFallbacks.length - 1) index = 0;

    return item;
  };

  return handleGetNext;
};

export default useGetNextAdsFallback;
