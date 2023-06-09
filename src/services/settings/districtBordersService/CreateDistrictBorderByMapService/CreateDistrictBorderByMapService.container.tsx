import React, { useEffect } from 'react';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { CreateDistrictBorderByMapService } from './CreateDistrictBorderByMapService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

const { inputs, outputs, gates } = CreateDistrictBorderByMapService;
const { HousingStocksListGate } = gates;

export const CreateDistrictBorderByMapContainer = () => {
  const housingStocksPagedList = useStore(outputs.$housingStocks);
  const isLoadingHousingStocks = useStore(outputs.$isLoadingHousingStocks);
  const isLoadingCreatingDistrict = useStore(
    outputs.$isLoadingCreatingDistrict,
  );
  const handleCreateDistrict = useEvent(inputs.handleCreateDistrict);

  const history = useHistory();

  useEffect(() => {
    inputs.districtCreated.watch(() => history.goBack());
  }, [history]);

  return (
    <>
      <HousingStocksListGate />
      <CreateDistrictBorderMapPage
        isLoadingHousingStocks={isLoadingHousingStocks}
        isLoadingCreatingDistrict={isLoadingCreatingDistrict}
        housingStocksList={housingStocksPagedList?.items || []}
        handleCreateDistrict={handleCreateDistrict}
      />
    </>
  );
};
