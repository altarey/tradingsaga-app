import React from 'react';

const useStateRef = <S>(initialState: S | (() => S)) => {
  const [state, setState] = React.useState<S>(initialState);
  const ref = React.useRef<S>(state);

  const dispatch: React.Dispatch<React.SetStateAction<S>> = React.useCallback((value) => {
    // @ts-ignore It throws - This expression is not callable. Have no idea why
    ref.current = typeof value === 'function' ? value(ref.current) : value;

    setState(ref.current);
  }, []);

  return [state, dispatch, ref] as const;
};

export default useStateRef;
