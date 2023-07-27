import { Checkbox } from 'antd';
import React, { FC } from 'react';
import { Circle, GroupWrapper } from './SelectGraphTypeItem.styled';
import { SelectGraphTypeItemProps } from './SelectGraphTypeItem.types';
import { Loader } from 'ui-kit/Loader';

export const SelectGraphTypeItem: FC<SelectGraphTypeItemProps> = ({
  disabled,
  checked,
  setChecked,
  color,
  text,
  isLoading,
}) => {
  return (
    <GroupWrapper
      onClick={() => !disabled && setChecked(!checked)}
      disabled={disabled}
      isLoading={isLoading}
    >
      <Checkbox disabled={disabled} checked={checked} />
      <Circle color={color} />
      {text}
      <Loader show={isLoading} />
    </GroupWrapper>
  );
};
