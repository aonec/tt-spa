import React from 'react';
import { NavLink } from 'react-router-dom';
import styledC from 'styled-components';
import styled from 'reshadow/macro';

import { menu as style } from '01/styles/menu';
import { Icon } from '01/components/Icon';
import { useMenu } from './useMenu';

export const Menu = () => {
  const menuList = useMenu();

  return styled(style)(
    <nav>
      {menuList.map(({ name, to, icon, company }, i) => (
        <NavLink key={i} to={to} activeClassName={style.active}>
          {icon && <Icon icon={icon} />}
          <span>{name}</span>
          {company && <span>{company}</span>}
        </NavLink>
      ))}
      <ExitLink key={'10'} to={'/login/'} activeClassName={style.active}>
        <ExitIcon icon={'exitIcon'} />
        <span>Выход из системы</span>
      </ExitLink>
    </nav>,
  );
};

const ExitLink = styledC(NavLink)`
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 24px;
    left: 16px;
`;

const ExitIcon = styledC(Icon)`
    margin-right: 8px;
`;
