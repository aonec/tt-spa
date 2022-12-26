/* eslint-disable */

import React from 'react';
import t from 'prop-types';
import { Icon } from '01/components/Icon';
import { LoaderWrapper } from './Loader.styled';

export const Loader = ({ children = null, show = false, ...props }) => {
  const loader = (
    <LoaderWrapper>
      <Icon icon="replacement" {...props} />
    </LoaderWrapper>
  );

  return show ? loader : children;
};

Loader.propTypes = {
  show: t.bool.isRequired,
  children: t.any,
};
