import { fromEnter } from '01/shared/ui/DatePickerNative';
import React, { FC } from 'react';
import { InputSC } from './MeteringDeviceMonthReadingInput.styled';
import { MeteringDeviceMonthReadingInputProps } from './MeteringDeviceMonthReadingInput.types';
import {
  getInputValue,
  getReadingValue,
} from './MeteringDeviceMonthReadingInput.utils';
import { EMagistralType } from 'myApi';

export const MeteringDeviceMonthReadingInput: FC<
  MeteringDeviceMonthReadingInputProps
> = ({
  reading,
  setFieldValue,
  createReading,
  initialFeedFlowReading,
  initialFeedBackFlowReading,
}) => {
  const createReadingWithChangesTracking = () => {
    if (
      reading.magistralType === EMagistralType.FeedFlow &&
      initialFeedFlowReading?.value !== reading.value
    ) {
      createReading({
        ...reading,
        value: Number(reading.value),
      });
    }
    if (
      reading.magistralType === EMagistralType.FeedBackFlow &&
      initialFeedBackFlowReading?.value !== reading.value
    ) {
      createReading({
        ...reading,
        value: Number(reading.value),
      });
    }
    return;
  };

  return (
    <InputSC
      search
      size="small"
      value={getInputValue(reading.value)}
      onFocus={(e) => e.currentTarget.select()}
      onKeyDown={fromEnter(() =>
        createReading({
          ...reading,
          value: Number(reading.value),
        }),
      )}
      type="number"
      onChange={(e) =>
        setFieldValue({
          ...reading,
          value: getReadingValue(e.target.value),
        })
      }
      onBlur={() => createReadingWithChangesTracking()}
    />
  );
};
