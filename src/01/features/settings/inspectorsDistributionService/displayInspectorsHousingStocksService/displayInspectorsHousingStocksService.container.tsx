import React, { FC } from 'react';
import { displayInspectorsHousingStocksService } from './displayInspectorsHousingStocksService.models';
import { useEvent, useStore } from 'effector-react';
import { InspectorsHousingStocksList } from './views/InspectorsHousingStocksList';
import { inspectorHousingStockService } from './inspectorHousingStockService/inspectorHousingStockService.models';
import { range } from 'lodash';

export const InspectorsHousingStocksListContainer: FC = () => {
  const housingStocks = useStore(
    displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList
  );
  const loading = useStore(
    displayInspectorsHousingStocksService.outputs.$loading
  );

  const inspectors = useStore(inspectorHousingStockService.outputs.$inspectors);
  const updateInfo = useStore(
    inspectorHousingStockService.outputs.$currentHousingStockUpdates
  );

  const updateHousingStock = useEvent(
    inspectorHousingStockService.inputs.updateHousingStockInspectorInfo
  );

  const days = range(15, 26, 1);

  return (
    <InspectorsHousingStocksList
      loading={loading}
      housingStocks={housingStocks}
      days={days}
      inspectors={inspectors}
      updateHousingStock={updateHousingStock}
      updateInfo={updateInfo}
    />
  );
};
