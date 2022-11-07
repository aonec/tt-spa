/* eslint-disable */

import { NavLink } from 'react-router-dom';
import React from 'react';
import t from 'prop-types';

export const Tabs = React.memo(({ children = [], ...props }) => {
  return (
    <div {...props}>
      {children.map(({ name, to, ...rest }, i) => (
        <NavLink key={name} to={to} replace activeClassName={style.active}>
          {name}
        </NavLink>
      ))}
    </div>
  );
});

Tabs.propTypes = {
  children: t.arrayOf(
    t.shape({
      name: t.string.isRequired,
      to: t.string.isRequired,
    })
  ).isRequired,
};
