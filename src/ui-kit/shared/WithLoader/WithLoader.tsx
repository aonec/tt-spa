import React, { FC } from 'react';
import { WithLoaderProps } from './WithLoader.types';
import { SkeletonSC } from './WithLoader.styled';

export const WithLoader: FC<WithLoaderProps> = ({
  isLoading,
  children,
  maxWidth,
}) => {
  return (
    <>
      {isLoading && (
        <SkeletonSC
          active
          // style={{ maxWidth: maxWidth || 'fit-content' }}
          maxWidth={maxWidth}
        />
      )}
      {!isLoading && children}
    </>
  );
};
