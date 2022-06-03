/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { menu as style } from '01/styles/menu';
import { Icon } from '01/components/Icon';
import { useMenu } from './useMenu';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';

export const Menu = () => {
  const { menuList, user } = useMenu();
  const history = useHistory();
  const pathname = usePathname();

  const isActive = (to) => pathname.includes(to);

  const component = (
    <div>
      <MenuList>
        <User>
          <MenuItem
            style={{ paddingTop: 5, paddingBottom: 5, height: 'auto' }}
            onClick={() => history.push(user.to)}
            activeElem={isActive(user.to)}
          >
            <div>
              <Flex>
                {user.icon && (
                  <Icon size={16} icon={user.icon} fill={'#00a3e7'} />
                )}
                <Space w={10} />
                <span>{user.name}</span>
              </Flex>
              {user.company && (
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    opacity: 0.6,
                    color: 'black',
                    marginLeft: 27,
                    marginTop: 2,
                  }}
                >
                  {user.company}
                </div>
              )}
            </div>
          </MenuItem>
        </User>

        {menuList.map(({ name, to, icon, company }) => (
          <MenuItem onClick={() => history.push(to)} activeElem={isActive(to)}>
            {icon && <Icon size={16} icon={icon} fill={'#00a3e7'} />}
            <Space w={10} />
            <span>{name}</span>
          </MenuItem>
        ))}
      </MenuList>
      <ExitLink key={'10'} to={'/login/'} activeClassName={style.active}>
        <ExitIcon icon={'exitIcon'} />
        <span>Выход из системы</span>
      </ExitLink>
    </div>
  );

  return <Wrap>{component}</Wrap>;
};

const User = styled.div``;

const MenuList = styled.div``;
const MenuItem = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 0 0 15px;
  cursor: pointer;
  ${({ activeElem }) => {
    return activeElem
      ? `border-left: 4px solid #00a3e7; padding: 0 0 0 11px; background: #00a3e714;`
      : '';
  }}

  &:hover {
    transition: 0.1s;
    background: #00a3e714;
    color: #00a3e7;
  }
`;

const Wrap = styled.div`
  font-weight: 500;
`;

const ExitLink = styled(NavLink)`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 24px;
  left: 16px;
`;

const ExitIcon = styled(Icon)`
  margin-right: 8px;
`;

export function usePathname() {
  const [pathname, setPathName] = useState(window.location.pathname);

  useEffect(() => {
    const intervalId = setInterval(
      () => setPathName(window.location.pathname),
      5
    );

    return () => clearInterval(intervalId);
  }, []);

  return pathname;
}
