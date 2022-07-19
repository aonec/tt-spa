import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDown } from 'react-bootstrap-icons';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
`;

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

export const Chevron = styled(ChevronDown)<{ isOpen: boolean }>`
  transform: translateY(9px)
    ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : '')};
  cursor: pointer;
`;
