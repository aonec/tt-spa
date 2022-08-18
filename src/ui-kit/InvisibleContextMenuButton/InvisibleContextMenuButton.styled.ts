import { Button, Menu } from 'antd';
import styled from 'styled-components';
import { MoreIcon } from 'ui-kit/icons';

export const ButtonSC = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  box-shadow: none;

  :focus {
    color: transparent;
    background-color: transparent;
  }
  :hover {
    background-color: transparent;
  }
`;

export const MenuItemSC = styled(Menu.Item)<{ color: string }>`
  min-width: 260px;
  color: ${({ color }) => color || 'var(--primary)'} !important;
`;

export const MoreIconSC = styled(MoreIcon)<{ isFocused: boolean }>`
  path {
    ${({ isFocused }) => isFocused && 'fill: #189EE9;'}
  }
`;
