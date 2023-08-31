import { Button, Menu } from 'antd';
import styled from 'styled-components';
import { ContextMenuButtonColorsLookup } from './ContextMenuButton.types';
import { ChevronDown } from 'react-bootstrap-icons';

export const StyledMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray !important;
  width: ${({ size }) => (size === 'small' ? '32px' : '48px')};
  height: ${({ size }) => (size === 'small' ? '32px' : '48px')} !important;
  border-radius: 4px;
`;

export const MenuItem = styled(Menu.Item)<{ color?: string }>`
  min-width: 408px;
  color: ${({ color = ContextMenuButtonColorsLookup.primary }) =>
    color} !important;

  .ant-dropdown-menu-title-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &:hover {
    color: white !important;
  }
`;

export const ChevronSC = styled(ChevronDown)<{ isOpen: boolean }>`
  transition: 0.2s;
  transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
`;
