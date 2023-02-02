import React, { FC } from 'react';
import { Icon } from '01/components/Icon';
import { LoaderWrapper } from './Loader.styled';
import { LoaderProps } from './Loader.types';

export const Loader: FC<LoaderProps> = ({ children, show, size, ...props }) => {
  const loader = (
    <LoaderWrapper>
      <Icon icon="replacement" {...props} size={Number(size)} />
    </LoaderWrapper>
  );

  return (
    <>
      {show && loader}
      {!show && children}
    </>
  );
};
