import React, { FC, useMemo } from 'react';
import { HousingStocksListProps } from './HousingStocksList.types';
import { HousingStocksListItem } from './HousingStocksListItem';

export const HousingStocksList: FC<HousingStocksListProps> = ({
  housingStocks,
  selectHousingStock,
  statisticIsLoading
}) => {
  const list = useMemo(
    () =>
      housingStocks.map((housingStock) => (
        <HousingStocksListItem
          housingStock={housingStock}
          key={housingStock.id}
          selectHousingStock={selectHousingStock}
          statisticIsLoading={statisticIsLoading}
        />
      )),
    [housingStocks]
  );

  return <div>{list}</div>;
};
