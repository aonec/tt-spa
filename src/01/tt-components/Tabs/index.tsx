import React from 'react';
import styled from 'styled-components';
import { NavLink, useRouteMatch } from 'react-router-dom';

export interface TabItemsInterface {
  tabItems: string[][];
  path: string;
}

export const Tabs = ({ tabItems, path }: TabItemsInterface) => {
  const matchParams = useRouteMatch<string>(path);
  if (!matchParams) {
    return null;
  }
  const { url } = matchParams;

  return (
    <StyledTabs>
      {tabItems.map((t) => (
        <NavLink
          key={t[0]}
          to={t[1] ? `${url}/${t[1]}` : url}
          activeClassName={StyledTabs.active}
          replace
          exact={!t[1]}
        >
          {t[0]}
        </NavLink>
      ))}
    </StyledTabs>
  );
};

export default Tabs;

const StyledTabs = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-auto-flow: column;
  justify-content: start;
  border-bottom: 1px solid var(--frame);
  font-size: 16px;
  font-weight: 500;
  line-height: 2em;

  & > * {
    padding: 8px;
    position: relative;
    color: var(--standart);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      border-top: 2px solid transparent;
      border-radius: 4px 4px 0 0;
    }

    &:hover {
      color: var(--primary-100);
    }
  }

  .active {
    color: var(--primary-100);

    &::before {
      border-color: inherit;
    }
  }
`;
