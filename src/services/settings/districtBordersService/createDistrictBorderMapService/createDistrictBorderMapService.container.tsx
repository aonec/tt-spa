import React, { useEffect } from 'react';
import { createDistrictBorderMapService } from './createDistrictBorderMapService.models';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { useUnit } from 'effector-react';
import {
  createDistrictMutation,
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './createDistrictBorderMapService.api';
import {  useNavigate } from 'react-router-dom';

const {
  outputs,
  gates: { CreateDistrictGate },
} = createDistrictBorderMapService;

export const CreateDistrictBorderMapContainer = () => {
  const navigate =  useNavigate();

  const { preselectedDistrictPayload, organizationCoordinates } = useUnit({
    preselectedDistrictPayload: outputs.$preselectedDistrictPayload,
    organizationCoordinates: outputs.$organizationCoordinates,
  });

  const { data: existingHousingStocks, pending: isLoadingHousingStocks } =
    useUnit(existingHousingStocksQuery);

  const { data: existingDistricts, pending: isLoadingDistricts } = useUnit(
    existingDistrictsQuery,
  );

  const { start: handleCreateDistrict, pending: isLoadingPostDistrict } =
    useUnit(createDistrictMutation);

  useEffect(() => {
    return createDistrictMutation.finished.success.watch(() =>
       navigate('/settings/districtBorder'),
    ).unsubscribe;
  }, [navigate]);

  return (
    <>
      <CreateDistrictGate />
      <CreateDistrictBorderMapPage
        existingHousingStocks={existingHousingStocks}
        existingDistricts={existingDistricts}
        isLoading={isLoadingHousingStocks || isLoadingDistricts}
        handleCreateDistrict={handleCreateDistrict}
        preselectedDistrictPayload={preselectedDistrictPayload}
        organizationCoordinates={organizationCoordinates}
        isLoadingPostDistrict={isLoadingPostDistrict}
      />
    </>
  );
};
