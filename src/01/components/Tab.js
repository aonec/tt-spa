/* eslint-disable */

import React from 'react';
import { NavLink } from 'react-router-dom';

export const Tab = ({ styles, name, ...props }) => (
  <NavLink to="/" activeClassName={styles.active} {...props}>
    {name}
  </NavLink>
);

Tab.defaultProps = {
  styles: {},
};
