import React, { FC } from 'react';
import {
  KeyWrapper,
  SkeletonLoader,
  ValueWrapper,
  Wrapper,
} from './CommonInfo.styled';
import { CommonInfoProps } from './CommonInfo.types';

export const CommonInfo: FC<CommonInfoProps> = ({
  items,
  className,
  isLoading,
  isLastUnderline = true,
}) => {
  return (
    <div className={className}>
      {items.map(({ key, value, hidden }) => {
        if (hidden) {
          return null;
        }

        return (
          <Wrapper key={key} isLastUnderline={isLastUnderline}>
            <KeyWrapper>{key}</KeyWrapper>
            {isLoading ? (
              <SkeletonLoader active />
            ) : (
              <ValueWrapper>{value || '—'}</ValueWrapper>
            )}
          </Wrapper>
        );
      })}
    </div>
  );
};
