import React from 'react';

import {BACK_ICON} from '../../config/icons';
import NavbarIcon from './NavbarIcon';
import appScale from '../../utils/appScale';
import generateInsets from '../../utils/generateInsets';

interface NavbarBackIconProps {
  onPress: () => void;
  isDisabled?: boolean;
}

const ICON_SIZE = appScale(38);

const NavbarBackIcon: React.FC<NavbarBackIconProps> = ({onPress, isDisabled}) => {
  return (
    <NavbarIcon insets={generateInsets(0)} source={BACK_ICON} onPress={onPress} isDisabled={isDisabled} iconSize={ICON_SIZE}  />
  );
};

export default NavbarBackIcon;
