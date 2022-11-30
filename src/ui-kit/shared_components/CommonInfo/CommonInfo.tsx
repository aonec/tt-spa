import React, { FC } from 'react';
import { KeyWrapper, ValueWrapper, Wrapper } from './CommonInfo.styled';
import { CommonInfoProps } from './CommonInfo.types';

export const CommonInfo: FC<CommonInfoProps> = ({ items }) => {
  return (
    <div>
      {items.map(({ key, value }) => (
        <Wrapper>
          <KeyWrapper>{key}</KeyWrapper>
          <ValueWrapper>{value || '—'}</ValueWrapper>
        </Wrapper>
      ))}
    </div>
  );
};
