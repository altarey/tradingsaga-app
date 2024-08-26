import { Amplitude } from '@amplitude/react-native';

const API_KEY = '6bac7583412f74e1caf1e402c22e223f';

export const ampInstance = Amplitude.getInstance();
ampInstance.init(API_KEY);
