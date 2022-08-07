import { fromEnter } from '01/shared/ui/DatePickerNative';
import React, { FC, useMemo } from 'react';
import { getFilledArray } from 'utils/getFilledArray';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { useSwitchInputOnEnter } from './MetersInputBlock.hook';
import {
  Input,
  InputWrapper,
  ReadingDate,
  Wrapper,
} from './MetersInputsBlock.styled';
import { MetersInputsBlockProps } from './MetersInputsBlock.types';
import { getRateNum } from './MetersInputsBlock.utils';

export const MetersInputsBlock: FC<MetersInputsBlockProps> = ({
  resource,
  rateType,
  reading,
  sliderIndex,
  isPrevious,
  isDisabled,
  inputIndex,
}) => {
  const rateNum = useMemo(() => getRateNum(rateType), [rateType]);

  const dataString = isPrevious ? 'previuos' : 'current';

  const nextInput = useSwitchInputOnEnter(dataString, isPrevious);

  const inputDataAttr = useMemo(() => {
    if (isDisabled) return {};

    return { 'data-reading-input': dataString };
  }, [isDisabled, isPrevious]);

  const inputsArray = useMemo(
    () =>
      getFilledArray(rateNum, (index) => {
        const valueKey = `value${index + 1}` as keyof typeof reading;

        const readingValue = reading?.[valueKey] || '';

        return (
          <InputWrapper>
            <Input
              onKeyDown={fromEnter(() => nextInput(inputIndex + index))}
              value={readingValue}
              placeholder={`T${index + 1}`}
              key={index}
              {...inputDataAttr}
            />
          </InputWrapper>
        );
      }),
    [reading, rateNum, sliderIndex]
  );
  const readingDate = useMemo(() => {
    const readingDate = reading?.uploadTime;

    if (!readingDate) return '';

    return getTimeStringByUTC(readingDate, 'DD.MM.YYYY');
  }, [reading, sliderIndex]);

  return (
    <div>
      <Wrapper className="meters-wrapper" resource={resource}>
        {inputsArray}
      </Wrapper>
      <ReadingDate>{readingDate || 'Нет показаний'}</ReadingDate>
    </div>
  );
};
