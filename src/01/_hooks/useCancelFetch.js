import React from 'react';
import { cancel } from '01/axios';

export const useCancelFetch = (trigger = []) => {
  React.useEffect(
    () => () => typeof cancel === 'function' && cancel(),
    trigger
  );
};
