import React, { FC } from 'react';
import { KeyWrapper, ValueWrapper, Wrapper } from './CommonInfo.styled';
import { CommonInfoProps } from './CommonInfo.types';

export const CommonInfo: FC<CommonInfoProps> = ({ items, className }) => {
  return (
    <div className={className}>
      {items.map(({ key, value, hidden }) => {
        if (hidden) {
          return null;
        }

        return (
          <Wrapper key={key}>
            <KeyWrapper>{key}</KeyWrapper>
            <ValueWrapper>{value || '—'}</ValueWrapper>
          </Wrapper>
        );
      })}
    </div>
  );
};
