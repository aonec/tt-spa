import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SubMenuItemWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 35px;
  margin-top: 5px;
  padding: 0 15px 0 38px;
  color: #272f5a;
  border-left: 3px solid #00000000;

  &:hover {
    transition: 0.2s;
    path {
      fill: #189ee9 !important;
    }
  }
`;

export const SubMenuItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`;
