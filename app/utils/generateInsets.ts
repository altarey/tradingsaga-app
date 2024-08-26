import {Insets} from 'react-native';

const DEFAULT_INSET = 10;

const generateInsets = (ration: number): Insets => ({
  top: DEFAULT_INSET * ration,
  left: DEFAULT_INSET * ration,
  right: DEFAULT_INSET * ration,
  bottom: DEFAULT_INSET * ration,
});

export default generateInsets;
