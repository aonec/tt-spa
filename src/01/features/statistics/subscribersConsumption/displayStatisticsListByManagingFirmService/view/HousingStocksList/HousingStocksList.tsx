import React, { FC, useMemo } from 'react';
import { HousingStocksListProps } from './HousingStocksList.types';
import { HousingStocksListItem } from './HousingStocksListItem';

export const HousingStocksList: FC<HousingStocksListProps> = ({
  housingStocks,
  selectHousingStock,
  statisticIsLoading,
  handleOpenModal,
  selectedHousingStock,
  setFileName,
}) => {
  const list = useMemo(
    () =>
      housingStocks.map((housingStock) => (
        <HousingStocksListItem
          housingStock={housingStock}
          key={housingStock.id}
          selectHousingStock={selectHousingStock}
          statisticIsLoading={statisticIsLoading}
          handleOpenModal={handleOpenModal}
          selectedHousingStock={selectedHousingStock}
          setFileName={setFileName}
        />
      )),
    [housingStocks, statisticIsLoading],
  );

  return <div>{list}</div>;
};
