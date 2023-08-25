import React, { FC } from 'react';
import { displayInspectorsHousingStocksService } from './displayInspectorsHousingStocksService.models';
import { useUnit } from 'effector-react';
import { InspectorsHousingStocksList } from './views/InspectorsHousingStocksList';
import { inspectorHousingStockService } from './inspectorHousingStockService/inspectorHousingStockService.models';
import { range } from 'lodash';
import { getInspectorsHousingStocksQuery } from './displayInspectorsHousingStocksService.api';

const { DisplayInspectorsGate } = displayInspectorsHousingStocksService.gates;

export const InspectorsHousingStocksListContainer: FC = () => {
  const {
    housingStocks,
    inspectors,
    loading,
    updateHousingStock,
    updateInfo,
    isInspectorsFetched,
  } = useUnit({
    housingStocks:
      displayInspectorsHousingStocksService.outputs
        .$inspectorsHousingStocksList,
    loading: displayInspectorsHousingStocksService.outputs.$loading,
    inspectors: inspectorHousingStockService.outputs.$inspectors,
    updateInfo:
      inspectorHousingStockService.outputs.$currentHousingStockUpdates,
    updateHousingStock:
      inspectorHousingStockService.inputs.updateHousingStockInspectorInfo,
    isInspectorsFetched: getInspectorsHousingStocksQuery.$succeeded,
  });

  const days = range(15, 26, 1);

  return (
    <>
      <DisplayInspectorsGate />
      <InspectorsHousingStocksList
        loading={loading}
        housingStocks={housingStocks}
        days={days}
        inspectors={inspectors}
        updateHousingStock={updateHousingStock}
        updateInfo={updateInfo}
        isInspectorsFetched={isInspectorsFetched}
      />
    </>
  );
};
