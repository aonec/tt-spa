/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

export const LinkWrap = ({ children, to, ...props }) =>
  to ? (
    <Link to={to} {...props}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
