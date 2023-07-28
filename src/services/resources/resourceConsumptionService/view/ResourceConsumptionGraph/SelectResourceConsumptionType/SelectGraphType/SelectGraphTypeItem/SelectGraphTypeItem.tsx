import { Checkbox } from 'antd';
import React, { FC } from 'react';
import {
  Circle,
  GroupWrapper,
  OpacityWrapper,
} from './SelectGraphTypeItem.styled';
import { SelectGraphTypeItemProps } from './SelectGraphTypeItem.types';
import { Loader } from 'ui-kit/Loader';

export const SelectGraphTypeItem: FC<SelectGraphTypeItemProps> = ({
  disabled,
  checked,
  setChecked,
  color,
  text,
  isLoading,
  isConsumptionDataEmpty,
}) => {
  if (isConsumptionDataEmpty) return null;

  return (
    <GroupWrapper
      onClick={() => !disabled && setChecked(!checked)}
      disabled={disabled}
    >
      <OpacityWrapper isLoading={isLoading}>
        <Checkbox disabled={disabled} checked={checked} />
        <Circle color={color} />
        {text}
      </OpacityWrapper>
      <Loader show={isLoading} />
    </GroupWrapper>
  );
};
