import React, { FC } from 'react';
import { SelectGraphType } from './SelectGraphType';
import {
  CurrentMonthSelectColors,
  PrevMonthSelectColor,
} from './SelectResourceConsumptionType.constants';
import { Wrapper } from './SelectResourceConsumptionType.styled';
import { SelectResourceConsumptionTypeProps } from './SelectResourceConsumptionType.types';

export const SelectResourceConsumptionType: FC<SelectResourceConsumptionTypeProps> = ({
  disabled,
}) => {
  return (
    <Wrapper>
      <SelectGraphType
        title={'Выбранный период'}
        colors={CurrentMonthSelectColors}
        disabled={disabled.currentMonthData}
      />
      <SelectGraphType
        title={'Прошлый аналогичный период'}
        colors={PrevMonthSelectColor}
        disabled={disabled.prevMonthData}
      />
    </Wrapper>
  );
};
