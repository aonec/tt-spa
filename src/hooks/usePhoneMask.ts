import IMask from 'imask';
import { useState } from 'react';

export function usePhoneMask() {
  const [mask] = useState(
    IMask.createMask({
      mask: '8 000 000 00-00',
      max: 9,
    }),
  );

  return {
    maskValue: (phoneNumber: string) => {
      mask.resolve(phoneNumber);
      return mask.value;
    },
    unmaskedValue(value: string) {
      mask.resolve(value);
      return mask.unmaskedValue;
    },
    mask,
  };
}
