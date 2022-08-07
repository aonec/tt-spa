import React, { FC, useMemo } from 'react';
import { getFilledArray } from 'utils/getFilledArray';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
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
}) => {
  const rateNum = useMemo(() => getRateNum(rateType), [rateType]);

  const inputsArray = useMemo(
    () =>
      getFilledArray(rateNum, (index) => {
        const valueKey = `value${index + 1}` as keyof typeof reading;

        const readingValue = reading?.[valueKey] || '';

        return (
          <InputWrapper>
            <Input
              value={readingValue}
              placeholder={`T${index + 1}`}
              key={index}
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
