import { Checkbox } from 'antd';
import React, { FC, useMemo } from 'react';
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
  const isActive = !isConsumptionDataEmpty && !disabled;

  return (
    <GroupWrapper
      onClick={() => isActive && setChecked(!checked)}
      disabled={isConsumptionDataEmpty || disabled}
    >
      <OpacityWrapper disabled={!isActive}>
        <Checkbox disabled={!isActive} checked={checked} />
        <Circle color={color} />
        {text}
      </OpacityWrapper>
      <Loader show={isLoading} />
    </GroupWrapper>
  );
};
