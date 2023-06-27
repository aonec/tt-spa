import React, { useEffect } from 'react';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { CreateDistrictBorderByMapService } from './CreateDistrictBorderByMapService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { findPolygonCenter } from '../districtBordersByAddressService/districtBordersByAddressService.utils';

const { inputs, outputs, gates } = CreateDistrictBorderByMapService;
const { HousingStocksListGate, CreateDistrictBorderMapPageGate } = gates;

export const CreateDistrictBorderByMapContainer = () => {
  const housingStocksPagedList = useStore(outputs.$housingStocks);
  const isLoadingHousingStocks = useStore(outputs.$isLoadingHousingStocks);
  const selectedHousingStockIdsAndPoligon = useStore(
    outputs.$selectedHousingStockIdsAndPoligon,
  );

  const handleCloseDistrictEditer = useEvent(inputs.handleCloseDistrictEditer);

  const selectedByAddressHousingStockIds =
    selectedHousingStockIdsAndPoligon.housingStockIds;
  const selectedByAddressPoligon =
    selectedHousingStockIdsAndPoligon.polygon as [number, number][];

  const poligonCenter = findPolygonCenter(selectedByAddressPoligon);
  const isLoadingCreatingDistrict = useStore(
    outputs.$isLoadingCreatingDistrict,
  );
  const existingDistricts = useStore(outputs.$existingDistricts);
  const handleCreateDistrict = useEvent(inputs.handleCreateDistrict);

  const history = useHistory();

  useEffect(() => {
    inputs.districtCreated.watch(() => history.goBack());
  }, [history]);

  return (
    <>
      <CreateDistrictBorderMapPageGate />
      <HousingStocksListGate />
      <CreateDistrictBorderMapPage
        isLoadingHousingStocks={isLoadingHousingStocks}
        isLoadingCreatingDistrict={isLoadingCreatingDistrict}
        housingStocksList={housingStocksPagedList?.items || []}
        selectedByAddressHousingStockIds={selectedByAddressHousingStockIds}
        selectedByAddressPoligon={selectedByAddressPoligon}
        poligonCenter={poligonCenter}
        handleCloseDistrictEditer={handleCloseDistrictEditer}
        handleCreateDistrict={handleCreateDistrict}
        existingDistricts={existingDistricts}
      />
    </>
  );
};
