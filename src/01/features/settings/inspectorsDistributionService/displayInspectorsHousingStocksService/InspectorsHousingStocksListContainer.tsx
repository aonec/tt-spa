import React, { FC } from 'react';
import { displayInspectorsHousingStocksService } from './displayInspectorsHousingStocksService.models';
import { useStore } from 'effector-react';
import { InspectorsHousingStocksList } from './views/InspectorsHousingStocksList';

export const InspectorsHousingStocksListContainer: FC = () => {
  const housingStocks = useStore(
    displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList
  );
  const loading = useStore(
    displayInspectorsHousingStocksService.outputs.$loading
  );

  return (
    <InspectorsHousingStocksList
      loading={loading}
      housingStocks={housingStocks}
    />
  );
};
