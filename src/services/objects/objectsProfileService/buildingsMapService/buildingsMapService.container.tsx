import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { existingHousingStocksQuery } from './buildingsMapService.api';
import { BuildingsMap } from './BuildingsMap/BuildingsMap';

export const BuildingsMapContainer = () => {
  const {
    data: existingHousingStocks,
    start: fetchHousingStocks,
    pending: isLoading,
  } = useUnit(existingHousingStocksQuery);

  useEffect(fetchHousingStocks, [fetchHousingStocks]);

  return (
    <BuildingsMap
      isLoading={isLoading}
      existingHousingStocks={existingHousingStocks}
    />
  );
};
