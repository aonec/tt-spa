import React from 'react';
import { EditDistrictBordersMap } from './EditDistrictBordersMap';
import { useUnit } from 'effector-react';
import { currentUserService } from 'services/currentUserService';
import {
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './editDistrictBordersService.api';
import { editDistrictBordersService } from './editDistrictBordersService.models';

const {
  gates: { DistrictBordersGate },
} = editDistrictBordersService;

export const EditDistrictBordersContainer = () => {
  const { organizationCoordinates } = useUnit({
    organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
  });

  const { data: existingHousingStocks, pending: isLoadingHousingStocks } =
    useUnit(existingHousingStocksQuery);

  const { data: existingDistricts, pending: isLoadingDistricts } = useUnit(
    existingDistrictsQuery,
  );

  return (
    <>
      <DistrictBordersGate />
      <EditDistrictBordersMap
        existingHousingStocks={existingHousingStocks}
        existingDistricts={existingDistricts}
        organizationCoordinates={organizationCoordinates}
        isLoadingHousingStocks={isLoadingHousingStocks}
        isLoadingDistricts={isLoadingDistricts}
      />
    </>
  );
};
