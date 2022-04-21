import React, { FC } from 'react';
import { Wrap } from './components';
import { HousingStockItem } from './components/HousingStockItem/HousingStockItem';
import { InspectorsHosuingsStocksListProps } from './types';

export const InspectorsHousingStocksList: FC<InspectorsHosuingsStocksListProps> = ({ housingStocks }) => {
  return <Wrap>{housingStocks?.map(elem => <HousingStockItem housingStock={elem} />)}</Wrap>;
};

