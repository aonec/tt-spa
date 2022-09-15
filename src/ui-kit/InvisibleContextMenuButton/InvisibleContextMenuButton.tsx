import { Dropdown, Menu } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import {
  ButtonSC,
  MenuItemSC,
  MoreIconSC,
} from './InvisibleContextMenuButton.styled';
import {
  Color,
  InvisibleContextMenuButtonProps,
} from './InvisibleContextMenuButton.types';

export const InvisibleContextMenuButton: FC<InvisibleContextMenuButtonProps> = ({
  disabled,
  menuButtons,
}) => {
  const menuButtonsFiltered = menuButtons?.filter(({ hidden }) => !hidden);
  const [isFocused, setIsFocused] = useState(false);

  const menu = useMemo(() => {
    if (!menuButtonsFiltered) {
      return <></>;
    }
    return (
      <Menu>
        {menuButtonsFiltered.map((button) => {
          const { title, onClick, color = Color.default } = button;

          return (
            <MenuItemSC key={title + color} onClick={onClick} color={color}>
              {title}
            </MenuItemSC>
          );
        })}
      </Menu>
    );
  }, [menuButtonsFiltered]);

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      disabled={disabled}
      placement="bottomRight"
    >
      <ButtonSC
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <MoreIconSC isFocused={isFocused} />
      </ButtonSC>
    </Dropdown>
  );
};
