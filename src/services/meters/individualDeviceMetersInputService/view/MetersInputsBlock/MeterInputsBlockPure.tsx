import { EResourceType } from 'api/myApi';
import React, { ChangeEvent, FC, useMemo } from 'react';
import { getFilledArray } from 'utils/getFilledArray';
import { getReadingValueKey } from '../../individualDeviceMetersInputService.utils';
import { Input, InputWrapper, Wrapper } from './MetersInputsBlock.styled';
import { BufferedReadingValues } from './MetersInputsBlock.types';

export const MetersInputsBlockPure: FC<{
  rateNum: number;
  bufferedReadingValues: BufferedReadingValues;
  isDisabled?: boolean;
  resource?: EResourceType;
  handleReadingInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  rateNum,
  bufferedReadingValues,
  isDisabled,
  resource,
  handleReadingInputChange,
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
            />
          </InputWrapper>
        );
      }),
    [bufferedReadingValues, rateNum, isDisabled, handleReadingInputChange],
  );

  return <Wrapper resource={resource}>{inputsArray}</Wrapper>;
};
