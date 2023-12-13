import styled from 'styled-components';
import { ChevronDown } from 'react-bootstrap-icons';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
`;

export const MenuItemTitle = styled.div`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`;

export const Chevron = styled(ChevronDown)<{ open: boolean }>`
  transform: translateY(9px) ${({ open }) => (open ? 'rotate(180deg)' : '')};
  cursor: pointer;
`;
