import React from 'react';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { CreateDistrictBorderByMapService } from './CreateDistrictBorderByMapService.model';
import { useStore } from 'effector-react';
import { findPolygonCenter } from '../districtBordersByAddressService/districtBordersByAddressService.utils';

const { outputs, gates } = CreateDistrictBorderByMapService;
const { HousingStocksListGate } = gates;

export const CreateDistrictBorderByMapContainer = () => {
  const housingStocksPagedList = useStore(outputs.$housingStocks);
  const isLoadingHousingStocks = useStore(outputs.$isLoadingHousingStocks);
  const selectedHousingStockIdsAndPoligon = useStore(
    outputs.$selectedHousingStockIdsAndPoligon,
  );

  const selectedByAddressHousingStockIds =
    selectedHousingStockIdsAndPoligon.housingStockIds;
  const selectedByAddressPoligon =
    selectedHousingStockIdsAndPoligon.polygon as [number, number][];

  const poligonCenter = findPolygonCenter(selectedByAddressPoligon);

  return (
    <>
      <HousingStocksListGate />
      <CreateDistrictBorderMapPage
        isLoadingHousingStocks={isLoadingHousingStocks}
        housingStocksList={housingStocksPagedList?.items || []}
        selectedByAddressHousingStockIds={selectedByAddressHousingStockIds}
        selectedByAddressPoligon={selectedByAddressPoligon}
        poligonCenter={poligonCenter}
      />
    </>
  );
};
