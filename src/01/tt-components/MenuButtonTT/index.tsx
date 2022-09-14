import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Loader } from '01/components';

const StyledMenuButton = styled(Button).attrs((props) => ({
  form: props.form,
  size: props.size,
}))`
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

export interface MenuButtonInterface {
  title: string;
  cb: VoidFunction;
  show: boolean;
  color: string;
  clickable?: boolean;
}

interface Props {
  menuButtonArr: MenuButtonInterface[] | null;
  size?: SizeType;
  loading?: boolean;
  disabled?: boolean;
}

export const MenuButtonTT = (props: any) => {
  const { menuButtonArr: arr, size, disabled, loading } = props;

  function getCurrentColor(color: string) {
    switch (color) {
      case 'default':
        return 'rgba(39, 47, 90, 0.9)';
      case 'disabled':
        return 'rgba(39, 47, 90, 0.32)';
      case 'black':
        return 'rgba(39, 47, 90, 0.9)';
      case 'red':
        return '#FC525B';
      default:
        return 'rgba(39, 47, 90, 0.9)';
    }
  }

  const menu = (
    <Menu>
      {arr?.map((item: any) => {
        const { title, cb, color, show = false } = item;

        const currentColor = getCurrentColor(color);
        if (!show) {
          return null;
        }

        return (
          <MenuItem key={title + color} onClick={cb} color={currentColor}>
            {title}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
      <StyledMenuButton size={size}>
        {loading ? <Loader show /> : <MoreOutlined />}
      </StyledMenuButton>
    </Dropdown>
  );
};

export default MenuButtonTT;
