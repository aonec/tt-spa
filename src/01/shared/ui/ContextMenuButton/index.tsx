import React, { FC } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export interface ContextMenuElement {
  title: string;
  onClick(): void;
  hidden?: boolean;
  color?: Color;
}

export interface ContextMenuButtonProps {
  menuButtons?: ContextMenuElement[];
  disabled?: boolean;
}

export const ContextMenuButton: FC<ContextMenuButtonProps> = (props) => {
  const { menuButtons, disabled } = props;

  const menuButtonsFiltered = menuButtons?.filter(
    ({ hidden }) => !hidden
  );

  const menu = (
    <Menu>
      {menuButtonsFiltered?.map((button) => {
        const { title, onClick, color } = button;

        const currentColor = getButtonColor(color);

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
      <StyledMenuButton>
        <MoreOutlined />
      </StyledMenuButton>
    </Dropdown>
  );
};

const StyledMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 4px;
`;

const MenuItem = styled(Menu.Item)`
  min-width: 408px;
  color: ${(props) => props.color || 'var(--primary)'};
`;

enum Color {
  default = 'rgba(39, 47, 90, 0.9)',
  disabled = 'rgba(39, 47, 90, 0.32)',
  black = 'rgba(39, 47, 90, 0.9)',
  red = '#FC525B',
};

function getButtonColor(color?: keyof typeof Color) {
  if (!color) return Color.default;

  return Color[color] || Color.default;
}
