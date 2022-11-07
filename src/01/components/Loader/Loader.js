/* eslint-disable */

import React from 'react';
import t from 'prop-types';
import { Icon } from '01/components/Icon';

export const Loader = ({ children = null, show = false, ...props }) => {
  const loader = <Icon icon="replacement" {...props} />;
  return show ? loader : children;
};

Loader.propTypes = {
  show: t.bool.isRequired,
  children: t.any,
};
