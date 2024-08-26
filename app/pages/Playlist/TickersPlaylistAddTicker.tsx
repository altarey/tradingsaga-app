import {StyleSheet, View} from 'react-native';
import Button from '../../components/common/Button';
import React, {useState} from 'react';
import {Telemetry} from '../../utils/telemetry';
import ButtonsNames from '../../config/buttonsNames';
import {Routes} from '../../config/routes';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';

const DEFAULT_BUTTON_WIDTH = 250;

const TickersPlaylistAddTicker: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [buttonWidth, setButtonWidth] = useState(DEFAULT_BUTTON_WIDTH);

  const handleAddMoreButtonPress = () => {
    Telemetry.logPressButton(ButtonsNames.PLAYLIST_SCREEN_BUTTON_ADD_NEW);
    navigation.navigate(Routes.ADD_NEW_TICKER);
  };

  return (
    <View
      style={[styles.buttonContainer, { marginLeft: -buttonWidth / 2, width: buttonWidth }]}
      onLayout={(event) =>
        setButtonWidth(event.nativeEvent.layout.width || DEFAULT_BUTTON_WIDTH)}
    >
      <Button
        label="Find more tickers"
        onPress={handleAddMoreButtonPress}
        style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
  },
  buttonStyle: {
    paddingHorizontal: 30,
  },
});

export default TickersPlaylistAddTicker;
