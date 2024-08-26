// TODO: fix types
// @ts-nocheck
import {useEffect, useState} from 'react';

export function useDataAsync(getData, placeholder) {
  const [data, setData] = useState(placeholder);
  useEffect(() => {
    let mounted = true;
    getData().then((result) => {
      if (mounted) {
        setData(result);
      }
    });
    return () => {
      mounted = false;
    };
  }, [getData]);
  return data;
}
