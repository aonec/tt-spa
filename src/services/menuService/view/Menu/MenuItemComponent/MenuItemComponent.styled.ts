import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const MenuItemWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 35px;
  margin-top: 15px;
  padding: 0 15px;
  color: #272f5a;
  border-left: 3px solid #00000000;

  &:hover {
    transition: 0.2s;
    path {
      fill: #189ee9 !important;
    }
  }
`;

export const MenuItemTitle = styled.div`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
`;
