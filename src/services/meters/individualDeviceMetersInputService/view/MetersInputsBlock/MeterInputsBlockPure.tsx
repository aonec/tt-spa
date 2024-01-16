import { EResourceType } from 'api/types';
import React, { ChangeEvent, FC, useMemo } from 'react';
import { getFilledArray } from 'utils/getFilledArray';
import { getReadingValueKey } from '../../individualDeviceMetersInputService.utils';
import { Input, InputWrapper, Wrapper } from './MetersInputsBlock.styled';
import { BufferedReadingValues } from './MetersInputsBlock.types';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';

export const MetersInputsBlockPure: FC<{
  rateNum: number;
  bufferedReadingValues: BufferedReadingValues;
  handleReadingInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  resource?: EResourceType;
}> = ({
  rateNum,
  bufferedReadingValues,
  handleReadingInputChange,
  isDisabled,
  resource,
}) => {
  const inputsArray = useMemo(
    () =>
      getFilledArray(rateNum, (index) => {
        const valueKey = getReadingValueKey(index);

        const readingValue = bufferedReadingValues[valueKey] || '';

        return (
          <InputWrapper key={index}>
            <Input
              type="number"
              disabled={isDisabled}
              value={readingValue}
              name={valueKey}
              placeholder={`T${index + 1}`}
              onChange={handleReadingInputChange}
              onKeyDown={fromEnter(() => {
                console.log({ readingValue: readingValue, valueKey: valueKey });
              })}
            />
          </InputWrapper>
        );
      }),
    [bufferedReadingValues, rateNum, isDisabled, handleReadingInputChange],
  );

  return <Wrapper resource={resource}>{inputsArray}</Wrapper>;
};
