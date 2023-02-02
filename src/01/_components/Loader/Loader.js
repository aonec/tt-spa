import React from 'react';
import { Icon } from '01/components/Icon';
import { LoaderWrapper } from './Loader.styled';

export const Loader = ({ children, show = false, ...props }) => {
  const loader = (
    <LoaderWrapper>
      <Icon icon="replacement" {...props} />
    </LoaderWrapper>
  );

  return show ? loader : children;
};
