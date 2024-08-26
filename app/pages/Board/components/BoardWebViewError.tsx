import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Button from '../../../components/common/Button';

import {Routes} from '../../../config/routes';
import {BOARD_BACKGROUND_COLOR, BOARD_FOREGROUND_COLOR, BOARD_Z_INDEXES} from '../boardConstants';
import {IS_DEV_MODE} from '../../../utils/environment';
import appScale from '../../../utils/appScale';
import {Telemetry} from '../../../utils/telemetry';

interface BoardWebViewErrorProps {
  onRetry: () => void;
  errorMessage: string;
}

const BoardWebViewError: React.FC<BoardWebViewErrorProps> = (props) => {
  const {onRetry, errorMessage} = props;
  const navigation = useNavigation();

  useEffect(() => {
    Telemetry.logBoardWebViewError(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate(Routes.HOME);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Cannot load the game :(</Text>
      <View style={styles.buttonContainer}>
        <Button label="Retry" onPress={onRetry} />
        <View style={styles.buttonSpace} />
        <Button label="Go Back" onPress={handleGoBack} />
      </View>
      {IS_DEV_MODE && <Text style={styles.devErrorMessageText}>{errorMessage}</Text>}
    </View>
  );
};

export default BoardWebViewError;

const styles = StyleSheet.create({
  container: {
    zIndex: BOARD_Z_INDEXES.BOARD_WEB_VIEW_ERROR,
    backgroundColor: BOARD_BACKGROUND_COLOR,

    position: 'absolute',
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainText: {
    fontSize: appScale(26),
    color: BOARD_FOREGROUND_COLOR,
    marginBottom: appScale(26),
  },
  devErrorMessageText: {
    color: BOARD_FOREGROUND_COLOR,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSpace: {
    width: appScale(20),
  },
});
