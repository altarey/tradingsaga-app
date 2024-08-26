import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import WebView from 'react-native-webview';

import {PLAYLIST_BG_COLOR} from '../../config/constants';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../config/routes';
import {RobotoRegular} from '../../config/fonts';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import AppSound from '../../utils/appSound';
import appScale from '../../utils/appScale';

export interface NewTickerFallbackProps {
  webView?: WebView | null;
  errorDEV?: [string | undefined, number, string];
}

const ImportTickerFallback: React.FC<NewTickerFallbackProps> = ({webView, errorDEV}) => {
  const navigation = useNavigation();
  const handleRetry = () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    Telemetry.logPressButton(ButtonsNames.ADD_NEW_TICKER_SCREEN_FALLBACK_RETRY);
    if (webView) webView.reload();
  };

  const handleNavigateToPlaylist = () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    Telemetry.logPressButton(ButtonsNames.ADD_NEW_TICKER_SCREEN_FALLBACK_PLAYLIST);
    navigation.navigate(Routes.PLAYLIST);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cannot add ticker at this moment. Possibly offline</Text>
      {webView ? (
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleNavigateToPlaylist}>
          <Text style={styles.buttonText}>Navigate To Playlist</Text>
        </TouchableOpacity>
      )}
      {__DEV__ && errorDEV && (
        <Text style={styles.errorText}>{`
          errorDomain: ${errorDEV[0]}
          errorCode: ${errorDEV[1]},
          errorDescription: ${errorDEV[2]}
          `}</Text>
      )}
    </View>
  );
};

export default ImportTickerFallback;

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
    marginBottom: appScale(20),
  },
  button: {
    marginBottom: appScale(10),
    minWidth: appScale(100),
    paddingHorizontal: appScale(30),
    paddingVertical: appScale(10),
    backgroundColor: '#243322',
  },
  buttonText: {
    fontSize: appScale(16),
    color: 'white',
    fontFamily: RobotoRegular,
    textAlign: 'center',
  },
  errorText: {
    color: 'white',
  },
});
