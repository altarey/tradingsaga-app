import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import TouchableImage from '../common/TouchableImage';
import useGetNextAdsFallback, {AdFallback} from '../../hooks/useGetNextAdsFallback';
import {Telemetry} from '../../utils/telemetry';
import {AdFallbackPositions} from '../../config/adFallbacks';

const BannerFallback: React.FC<{position: AdFallbackPositions}> = ({position}) => {
  const getAdFallback = useGetNextAdsFallback();
  const [adFallback, setAdFallback] = useState<AdFallback>();

  useEffect(() => {
    setAdFallback(getAdFallback());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adFallback) {
      Telemetry.logChangingAdFallback({
        position,
        name: adFallback.name,
        type: 'banner',
        action: 'shown',
      });
    }
  }, [adFallback, position]);

  const handleOnPress = () => {
    if (!adFallback) return;
    Telemetry.logChangingAdFallback({
      position,
      name: adFallback.name,
      type: 'banner',
      action: 'pressed',
    });
    adFallback.handler();
  };

  if (!adFallback) return null;

  return <TouchableImage source={adFallback.banner} onPress={handleOnPress} imageStyle={styles.image} />;
};

export default BannerFallback;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    aspectRatio: 14,
  },
});
