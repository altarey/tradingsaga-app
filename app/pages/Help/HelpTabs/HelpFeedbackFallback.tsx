import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {PLAYLIST_BG_COLOR} from '../../../config/constants';
import {Routes} from '../../../config/routes';
import {RobotoRegular} from '../../../config/fonts';
import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import Button from '../../../components/common/Button';
import {IS_DEV_MODE} from '../../../utils/environment';
import appScale from '../../../utils/appScale';

export interface FeedbackErrorFallbackProps {
  webView?: WebView | null;
  errorDEV?: [string | undefined, number, string];
}

const HelpFeedbackFallback: React.FC<FeedbackErrorFallbackProps> = ({webView, errorDEV}) => {
  const navigation = useNavigation();
  const handleRetry = () => {
    Telemetry.logPressButton(ButtonsNames.HELP_SCREEN_FEEDBACK_FALLBACK_RETRY);
    if (webView) webView.reload();
  };

  const handleNavigateToHome = () => {
    Telemetry.logPressButton(ButtonsNames.HELP_SCREEN_FEEDBACK_FALLBACK_GO_HOME_SCREEN);
    navigation.navigate(Routes.HOME);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Leaving feedback is not possible at this moment.</Text>
      {webView ? (
        <Button label="Retry" onPress={handleRetry} />
      ) : (
        <Button label="Navigate To Home" onPress={handleNavigateToHome} />
      )}
      {IS_DEV_MODE && errorDEV && (
        <Text style={styles.errorText}>{`
          errorDomain: ${errorDEV[0]}
          errorCode: ${errorDEV[1]},
          errorDescription: ${errorDEV[2]}
          `}</Text>
      )}
    </View>
  );
};

export default HelpFeedbackFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: PLAYLIST_BG_COLOR,
  },
  text: {
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: appScale(18),
    fontFamily: RobotoRegular,
    marginVertical: appScale(20),
  },
  errorText: {
    color: 'white',
  },
});
