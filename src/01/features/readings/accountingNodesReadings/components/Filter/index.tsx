import { useRef } from 'react';

import { getArrayByCountRange } from './Filter.utils';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';

export function useOnEnterSwitch(amount: number, difference?: number) {
  const refs = getArrayByCountRange(amount, useRef) as any[];

  const lastRef = refs[refs.length - 1];
  const refWithoutDisabled = refs.slice(0, (amount -= difference || 0));

  function onEnterHandler(index: number) {
    try {
      if (refs[index]?.current) refs[index]?.current?.blur();
    } catch (error) {}

    if (index === amount - 1) {
      if (lastRef?.current?.blur) lastRef?.current?.blur();
    }

    if (refs[index + 1]?.current?.focus) {
      refs[index + 1]?.current?.focus();
    }
  }

  const keyDownEnterGuardedHandler = (index: number) =>
    fromEnter(() => onEnterHandler(index));

  return {
    keyDownEnterGuardedHandler,
    refs,
    onEnterHandler,
    refWithoutDisabled,
  };
}
