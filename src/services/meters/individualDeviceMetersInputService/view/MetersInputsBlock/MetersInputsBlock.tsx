import React, { FC } from 'react';
import { getFilledArray } from 'utils/getFilledArray';
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
}) => {
  const rateNum = getRateNum(rateType);

  const inputsArray = getFilledArray(rateNum, (index) => (
    <InputWrapper>
      <Input placeholder={`T${index + 1}`} key={index} />
    </InputWrapper>
  ));

  return (
    <div>
      <Wrapper className="meters-wrapper" resource={resource}>
        {inputsArray}
      </Wrapper>
      <ReadingDate>Нет показаний</ReadingDate>
    </div>
  );
};
