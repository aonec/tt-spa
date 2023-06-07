import React from 'react';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { CreateDistrictBorderByMapService } from './CreateDistrictBorderByMapService.model';
import { useEvent, useStore } from 'effector-react';
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

  return (
    <>
      <CreateDistrictBorderMapPageGate />
      <HousingStocksListGate />
      <CreateDistrictBorderMapPage
        isLoadingHousingStocks={isLoadingHousingStocks}
        housingStocksList={housingStocksPagedList?.items || []}
        selectedByAddressHousingStockIds={selectedByAddressHousingStockIds}
        selectedByAddressPoligon={selectedByAddressPoligon}
        poligonCenter={poligonCenter}
        handleCloseDistrictEditer={handleCloseDistrictEditer}
      />
    </>
  );
};
