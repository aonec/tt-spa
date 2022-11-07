/* eslint-disable */

import React from 'react';

export const Page = ({ children, columns = '8fr 5fr', ...props }) => (
  <page {...props}>{children}</page>
);
