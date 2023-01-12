import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { WithLoaderProps } from './WithLoader.types';

export const WithLoader: FC<WithLoaderProps> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading && <Skeleton active />}
      {!isLoading && children}
    </>
  );
};
