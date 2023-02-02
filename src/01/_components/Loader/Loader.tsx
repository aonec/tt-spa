import React, { FC } from 'react';
import { Icon } from '01/components/Icon';
import { LoaderWrapper } from './Loader.styled';
import { LoaderProps } from './Loader.types';

export const Loader: FC<LoaderProps> = ({ children, show, ...props }) => {
  const loader = (
    <LoaderWrapper>
      <Icon icon="replacement" {...props} />
    </LoaderWrapper>
  );

  return (
    <>
      {show && loader}
      {!show && children}
    </>
  );
};
