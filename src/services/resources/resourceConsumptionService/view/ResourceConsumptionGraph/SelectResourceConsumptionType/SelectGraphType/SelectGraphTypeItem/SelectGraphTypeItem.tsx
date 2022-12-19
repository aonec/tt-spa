import { Checkbox } from 'antd';
import React, { FC } from 'react';
import { Circle, GroupWrapper } from './SelectGraphTypeItem.styled';
import { SelectGraphTypeItemProps } from './SelectGraphTypeItem.types';

export const SelectGraphTypeItem: FC<SelectGraphTypeItemProps> = ({
  disabled,
  checked,
  setChecked,
  color,
  text,
}) => {
  return (
    <GroupWrapper onClick={() => !disabled && setChecked(!checked)}>
      <Checkbox disabled={disabled} checked={checked} />
      <Circle color={color} />
      {text}
    </GroupWrapper>
  );
};
