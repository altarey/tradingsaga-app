import {ms} from 'react-native-size-matters';
import {APP_SCALE_FACTOR} from '../config/constants';

const appScale = (size: number) => ms(size, APP_SCALE_FACTOR);

export default appScale;
