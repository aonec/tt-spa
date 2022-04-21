import { StyledSelector } from '01/shared/ui/Fields';
import { Select } from 'antd';
import React, { FC } from 'react';
import { Address, Wrap } from './components';
import { HousingStockItemProps } from './types';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
  inspectors,
  days,
}) => {
  return (
    <Wrap>
      <Address>{`ул. ${housingStock.street} ${housingStock.number}${
        housingStock.corpus || ''
      }`}</Address>
      <div>{housingStock.houseManagement}</div>
      <StyledSelector placeholder="Число" noShadow>
        {days?.map((day) => (
          <Select.Option key={day} value={day}>
            {day} число
          </Select.Option>
        ))}
      </StyledSelector>
      <StyledSelector placeholder="Контролер" noShadow>
        {inspectors?.map((inspector) => (
          <Select.Option key={inspector.id} value={inspector.id}>
            {inspector.fullName}
          </Select.Option>
        ))}
      </StyledSelector>
    </Wrap>
  );
};
