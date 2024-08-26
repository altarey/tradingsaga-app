import {ImageStyle, Insets, StyleSheet, View} from 'react-native';
import React from 'react';
import {ImageSource} from 'react-native-vector-icons/Icon';

import IconButton from '../common/IconButton';
import appScale from '../../utils/appScale';
import generateInsets from '../../utils/generateInsets';

interface NavbarIconProps {
  onPress: () => void;
  source: ImageSource;
  buttonContainer?: ImageStyle;
  isDisabled?: boolean;
  iconSize?: number;
  insets?: Insets
}

const ICON_SIZE = appScale(20);
const NavbarIcon: React.FC<NavbarIconProps> = (props) => {
  const {iconSize = ICON_SIZE, onPress, source, buttonContainer, isDisabled, insets} = props;

  return (
    <View style={styles.container}>
      <IconButton
        insets={insets ?? generateInsets(1)}
        source={source}
        onPress={onPress}
        disabled={isDisabled}
        iconSize={iconSize}
        iconStyle={buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: appScale(10),
  },
});

export default NavbarIcon;
