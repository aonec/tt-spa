import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { existingHousingStocksQuery } from './buildingsMapService.api';
import { BuildingsMap } from './BuildingsMap/BuildingsMap';
import { currentOrganizationService } from 'services/currentOrganizationService';

export const BuildingsMapContainer = () => {
  const {
    data: existingHousingStocks,
    start: fetchHousingStocks,
    pending: isLoading,
  } = useUnit(existingHousingStocksQuery);

  const { organizationCoordinates } = useUnit({
    organizationCoordinates:
      currentOrganizationService.outputs.$organizationCoordinates,
  });

  useEffect(fetchHousingStocks, [fetchHousingStocks]);

  return (
    <BuildingsMap
      isLoading={isLoading}
      existingHousingStocks={existingHousingStocks}
      organizationCoordinates={organizationCoordinates}
    />
  );
};
