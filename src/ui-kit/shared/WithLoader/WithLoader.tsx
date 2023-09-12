import React, { FC } from 'react';
import { WithLoaderProps } from './WithLoader.types';
import { SkeletonSC } from './WithLoader.styled';

export const WithLoader: FC<WithLoaderProps> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading && <SkeletonSC active />}
      {!isLoading && children}
    </>
  );
};
