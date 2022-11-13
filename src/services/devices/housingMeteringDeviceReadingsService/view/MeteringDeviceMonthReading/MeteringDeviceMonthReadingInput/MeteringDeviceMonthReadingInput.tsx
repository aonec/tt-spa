import { fromEnter } from '01/shared/ui/DatePickerNative';
import React, { FC } from 'react';
import { InputSC } from './MeteringDeviceMonthReadingInput.styled';
import { MeteringDeviceMonthReadingInputProps } from './MeteringDeviceMonthReadingInput.types';
import { getInputValue, getReadingValue } from './MeteringDeviceMonthReadingInput.utils';

export const MeteringDeviceMonthReadingInput: FC<MeteringDeviceMonthReadingInputProps> = ({
  reading,
  setFieldValue,
  createReading,
}) => {
  return (
    <InputSC
      size="small"
      value={getInputValue(reading.value)}
      onFocus={(e) => e.currentTarget.select()}
      onKeyDown={fromEnter(() =>
        createReading({
          ...reading,
          value: Number(reading.value),
        })
      )}
      type="number"
      onChange={(e) =>
        setFieldValue({
          ...reading,
          value: getReadingValue(e.target.value),
        })
      }
    />
  );
};
