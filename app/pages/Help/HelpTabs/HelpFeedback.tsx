import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

import FullScreenLoadingSpinner from '../../../components/FullScreenLoadingSpinner';
import {FEEDBACK_FORM_URL} from '../../../config/constants';
import HelpFeedbackFallback from './HelpFeedbackFallback';
import Colors from '../../../config/colors';
import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import {useAppRate} from '../../../contexts/AppRateContext';
import rateUs from '../../../utils/rateUs';
import Button from '../../../components/common/Button';
import appScale from '../../../utils/appScale';

const HelpFeedback: React.FC = () => {
  const {
    setIsAppRated,
  } = useAppRate();

  const handleRateUs = () => {
    Telemetry.logPressButton(ButtonsNames.HELP_SCREEN_TABS_ABOUTS_US_RATE_US);

    rateUs((success) => {
      if (success) setIsAppRated(true);
    });
  };

  const webViewRef = useRef<WebView>(null);

  return (
    <View style={styles.container}>
      <View style={styles.rateUsContainer}>
        <Button label="Rate App" onPress={handleRateUs}/>
      </View>
      <WebView
        ref={webViewRef}
        style={styles.webView}
        source={{uri: FEEDBACK_FORM_URL}}
        startInLoadingState={true}
        renderLoading={() => <FullScreenLoadingSpinner style={styles.loadingSpinner} />}
        renderError={(...errorDEV) => <HelpFeedbackFallback webView={webViewRef.current} errorDEV={errorDEV} />}
        onError={() => <HelpFeedbackFallback webView={webViewRef.current} />}
      />
    </View>
  );
};

export default HelpFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  webView: {
    flex: 1,
    backgroundColor: Colors.MYRTLE.default,
  },
  loadingSpinner: {
    backgroundColor: Colors.MYRTLE.default,
  },
  rateUsContainer: {
    marginBottom: appScale(10),
    alignItems: 'center',
  },
});
