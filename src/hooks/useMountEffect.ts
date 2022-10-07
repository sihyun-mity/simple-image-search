/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect } from 'react';

interface PropsType {
  beforeRender?: boolean;
}

export default function useMountEffect(func: () => void, options?: PropsType) {
  const { beforeRender } = { ...options };

  useLayoutEffect(() => {
    beforeRender && func();
  }, []);

  useEffect(() => {
    !beforeRender && func();
  }, []);
}
