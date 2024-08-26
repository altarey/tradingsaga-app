import {useState, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export const PROCESS_STATES = {
  active: 'active',
  inactive: 'inactive',
  background: 'background',
  foreground: 'foreground',
};

interface UseProcessState {
  onChange?: (nextAppStateStatus: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

const CHANGE_STATE_NAME = 'change';

const useProcessState = ({onChange, onForeground, onBackground}: UseProcessState) => {
  const [currentState, setCurrentState] = useState(AppState.currentState);

  useEffect(() => {
    const handleStateChange: UseProcessState['onChange'] = (nextState) => {
      const {active, inactive, background} = PROCESS_STATES;

      if (nextState === active && currentState !== active) {
        onForeground && onForeground();
      } else if (currentState === active && [inactive, background].includes(nextState)) {
        onBackground && onBackground();
      }
      setCurrentState(nextState);
      onChange && onChange(nextState);
    };

    AppState.addEventListener(CHANGE_STATE_NAME, handleStateChange);

    return () => AppState.removeEventListener(CHANGE_STATE_NAME, handleStateChange);
  }, [onChange, onForeground, onBackground, currentState]);

  return currentState;
};

export default useProcessState;
