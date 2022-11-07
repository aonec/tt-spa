/* eslint-disable */

import React from 'react';
import t from 'prop-types';
import { Icon } from '01/components/Icon';

const style = css`
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  Icon {
    animation: spin 1000ms linear infinite;
    margin: 0 auto;
  }
`;

export const Loader = ({ children = null, show = false, ...props }) => {
  const loader = <Icon icon="replacement" {...props} />;
  return show ? loader : children;
};

Loader.propTypes = {
  show: t.bool.isRequired,
  children: t.any,
};
