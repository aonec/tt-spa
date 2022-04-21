import React, { FC } from 'react';
import { Address, Wrap } from './components';
import { HousingStockItemProps } from './types';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
}) => {
  return (
    <Wrap>
      <Address>{`ул. ${housingStock.street} ${housingStock.number}${
        housingStock.corpus || ''
      }`}</Address>
    </Wrap>
  );
};
