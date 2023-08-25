import React, { useEffect } from 'react';
import { createDistrictBorderMapService } from './createDistrictBorderMapService.models';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { useUnit } from 'effector-react';
import {
  createDistrictMutation,
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './createDistrictBorderMapService.api';
import { useHistory } from 'react-router-dom';

const {
  outputs,
  gates: { CreateDistrictGate },
} = createDistrictBorderMapService;

export const CreateDistrictBorderMapContainer = () => {
  const history = useHistory();

  const { preselectedDistrictPayload, organizationCoordinates } = useUnit({
    preselectedDistrictPayload: outputs.$preselectedDistrictPayload,
    organizationCoordinates: outputs.$organizationCoordinates,
  });

  const { data: existingHousingStocks, pending: isLoadingHousingStocks } =
    useUnit(existingHousingStocksQuery);

  const { data: existingDistricts, pending: isLoadingDistricts } = useUnit(
    existingDistrictsQuery,
  );

  const { start: handleCreateDistrict } = useUnit(createDistrictMutation);

  useEffect(() => {
    return createDistrictMutation.finished.success.watch(() =>
      history.push('/districtBordersSettings/manageDistricts'),
    ).unsubscribe;
  }, [history]);

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
      />
    </>
  );
};
