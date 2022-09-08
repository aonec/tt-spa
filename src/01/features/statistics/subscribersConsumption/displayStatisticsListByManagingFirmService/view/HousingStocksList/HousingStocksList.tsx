import React, { FC, useMemo } from 'react';
import { HousingStocksListProps } from './HousingStocksList.types';
import { HousingStocksListItem } from './HousingStocksListItem';

export const HousingStocksList: FC<HousingStocksListProps> = ({
  housingStocks,
  selectHousingStock,
}) => {
  const list = useMemo(
    () =>
      housingStocks.map((housingStock) => (
        <HousingStocksListItem
          housingStock={housingStock}
          key={housingStock.id}
          selectHousingStock={selectHousingStock}
        />
      )),
    [housingStocks]
  );

  return <div>{list}</div>;
};
