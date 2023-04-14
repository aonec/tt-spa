import React, { FC } from 'react';
import { LoaderWrapper } from './Loader.styled';
import { LoaderProps } from './Loader.types';
import { SwitchIcon } from 'ui-kit/icons';

export const Loader: FC<LoaderProps> = ({ children, show, size = 16 }) => {
  const loader = (
    <LoaderWrapper size={size}>
      <SwitchIcon />
    </LoaderWrapper>
  );

  return (
    <>
      {show && loader}
      {!show && children}
    </>
  );
};
