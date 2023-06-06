import React from 'react';
import { CreateDistrictBorderMapPage } from './view/CreateDistrictBorderMapPage';
import { CreateDistrictBorderByMapService } from './CreateDistrictBorderByMapService.model';
import { useStore } from 'effector-react';

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
  const selectedByAddressPoligon = selectedHousingStockIdsAndPoligon.polygon;

  return (
    <>
      <HousingStocksListGate />
      <CreateDistrictBorderMapPage
        isLoadingHousingStocks={isLoadingHousingStocks}
        housingStocksList={housingStocksPagedList?.items || []}
        selectedByAddressHousingStockIds={selectedByAddressHousingStockIds}
        selectedByAddressPoligon={selectedByAddressPoligon}
      />
    </>
  );
};
