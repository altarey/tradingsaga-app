import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const useOnScreenFocus = (callback: () => {}) => {
  const navigation = useNavigation();
  useEffect(() => navigation.addListener('focus', callback), [callback, navigation]);
};

export default useOnScreenFocus;
