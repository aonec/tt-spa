import React, { FC } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Color as ColorType } from 'ui-kit/InvisibleContextMenuButton/InvisibleContextMenuButton.types';

export interface ContextMenuElement {
  title: string;
  onClick(): void;
  hidden?: boolean;
  color?: string;
}

export interface ContextMenuButtonProps {
  menuButtons?: ContextMenuElement[];
  disabled?: boolean;
  size?: SizeType;
}

export const ContextMenuButton: FC<ContextMenuButtonProps> = (props) => {
  const { menuButtons, disabled, size } = props;

  const menuButtonsFiltered = menuButtons?.filter(({ hidden }) => !hidden);

  const menu = (
    <Menu>
      {menuButtonsFiltered?.map((button) => {
        const { title, onClick, color } = button;

        const currentColor = getButtonColor(color as ColorType);

        return (
          <MenuItem key={title + color} onClick={onClick} color={currentColor}>
            {title}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
      <StyledMenuButton size={size}>
        <MoreOutlined />
      </StyledMenuButton>
    </Dropdown>
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
  color: ${({ color }) => color || Color.default} !important;


  &:hover {
    color: white !important;
  }
`;

export const Color = {
  default: 'rgba(39, 47, 90, 0.9)',
  disabled: 'rgba(39, 47, 90, 0.32)',
  black: 'rgba(39, 47, 90, 0.9)',
  red: '#FC525B',
};

function getButtonColor(color?: ColorType) {
  if (!color) return Color.default;
  
  return (Color as any)[color] || Color.default;
}
