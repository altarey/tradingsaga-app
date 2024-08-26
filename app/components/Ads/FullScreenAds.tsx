import {ImageSourcePropType, Platform, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import useCountDown from 'react-countdown-hook';
import {ADS_FALLBACK_DURATION_MS} from '../../config/adFallbacks';
import {DialogWrapper} from '../Dialog';
import FallbackCountdownFullScreen from './FallbackCountdownFullScreen';
import TouchableImage from '../common/TouchableImage';
import Colors from '../../config/colors';
import useOnHardwareBackPress from '../../hooks/useOnHardwareBackPress';
import IconButton from '../common/IconButton';
import {CONFIRMATION_EXIT_ICON} from '../../config/icons';
import appScale from '../../utils/appScale';
import generateInsets from '../../utils/generateInsets';

interface FullScreenAdsProps {
  source: ImageSourcePropType;
  onPress: () => void;
  onExit: () => void;
}

const ICON_SIZE = appScale(
  Platform.select({
    ios: 20,
    default: 18,
  }),
);

const FullScreenAds: React.FC<FullScreenAdsProps> = ({source, onExit, onPress}) => {
  const [timeLeft, {start}] = useCountDown(ADS_FALLBACK_DURATION_MS);

  useEffect(start, []);

  useOnHardwareBackPress(() => {
    // disabled HardwareBackPress
    return true;
  });

  const canClose = !timeLeft;

  return (
    <DialogWrapper style={styles.dialogWrapper}>
      <View style={styles.actionContainer}>
        {canClose ? (
          <IconButton iconSize={ICON_SIZE} insets={generateInsets(2)} source={CONFIRMATION_EXIT_ICON} onPress={onExit} />
        ) : (
          <FallbackCountdownFullScreen leftoverMs={timeLeft} />
        )}
      </View>
      <TouchableImage onPress={onPress} source={source} imageStyle={styles.image} />
    </DialogWrapper>
  );
};

export default FullScreenAds;

const styles = StyleSheet.create({
  dialogWrapper: {
    backgroundColor: Colors.BLACK.default,
  },
  image: {
    flex: 1,
    maxWidth: '100%',
    maxHeight: '100%',
    resizeMode: 'contain',
  },
  actionContainer: {
    position: 'absolute',
    top: appScale(20),
    right: appScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    width: appScale(60),
    height: appScale(40),
  },
});
