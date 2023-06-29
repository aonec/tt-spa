import React from 'react';
import { createDistrictBorderMapService } from './createDistrictBorderMapService.models';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { useUnit } from 'effector-react';
import {
  createDistrictMutation,
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './createDistrictBorderMapService.api';

const {
  gates: { CreateDistrictGate },
} = createDistrictBorderMapService;

export const CreateDistrictBorderMapContainer = () => {
  const { data: existingHousingStocks, pending: isLoadingHousingStocks } =
    useUnit(existingHousingStocksQuery);

  const { data: existingDistricts, pending: isLoadingDistricts } = useUnit(
    existingDistrictsQuery,
  );

  const { start: handleCreateDistrict } = useUnit(createDistrictMutation);

  return (
    <>
      <CreateDistrictGate />
      <CreateDistrictBorderMapPage
        existingHousingStocks={existingHousingStocks}
        existingDistricts={existingDistricts}
        isLoading={isLoadingHousingStocks || isLoadingDistricts}
        handleCreateDistrict={handleCreateDistrict}
      />
    </>
  );
};
