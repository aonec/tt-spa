import React, { FC } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import styled from 'styled-components';
import { MoreIcon } from 'ui-kit/icons';
import {
  ContextMenuButtonColor,
  ContextMenuButtonColorsLookup,
  ContextMenuButtonProps,
} from './ContextMenuButton.types';

export const ContextMenuButton: FC<ContextMenuButtonProps> = (props) => {
  const { menuButtons, disabled, size } = props;

  const menuButtonsFiltered = menuButtons?.filter(({ hidden }) => !hidden);

  const menu = (
    <Menu>
      {menuButtonsFiltered?.map((button, index) => {
        const { title, onClick, color } = button;

        const currentColor = getButtonColor(color);

        return (
          <MenuItem key={index} onClick={onClick} color={currentColor}>
            {title}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
        <StyledMenuButton size={size}>
          <MoreIcon />
        </StyledMenuButton>
      </Dropdown>
    </div>
  );
};

const StyledMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray !important;
  width: ${({ size }) => (size === 'small' ? '32px' : '48px')};
  height: ${({ size }) => (size === 'small' ? '32px' : '48px')};
  border-radius: 4px;
`;

const MenuItem = styled(Menu.Item)<{ color?: string }>`
  min-width: 408px;
  color: ${({ color = ContextMenuButtonColorsLookup.primary }) =>
    color} !important;

  &:hover {
    color: white !important;
  }
`;

function getButtonColor(color?: ContextMenuButtonColor) {
  if (!color) return ContextMenuButtonColorsLookup.primary;

  return ContextMenuButtonColorsLookup[color];
}
