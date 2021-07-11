import IMask from 'imask';
import { useState } from 'react';

interface Config<T> {
  value: T;
  show: boolean;
}
export function getValueByPriority<T>(configs: Config<T>[]): T | null {
  for (const elem of configs) {
    if (elem.show) {
      return elem.value;
    }
  }

  return null;
}

export function usePhoneMask() {
  const [mask] = useState(
    IMask.createMask({
      mask: '8 000 000 00-00',
      max: 9,
    }),
  );

  return {
    maskValue: (phoneNumber: string) =>
      phoneNumber && mask.resolve(phoneNumber),
    unmaskedValue(value: string) {
      mask.resolve(value);
      return mask.unmaskedValue;
    },
    mask,
  };
}
