import { displayInspectorsService } from '01/features/Inspectors/displayInspectors/displayInspectorsService.models';
import { createDomain } from 'effector';
import { HousingStockResponse } from 'myApi';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { patchHousingStockInspectorInfo } from './inspectorHousingStockService.api';
import {
  CurrentHousingStockUpdate,
  PatchHousingStockInspectorInfoPayload,
} from './inspectorHousingStockService.types';

const inspectorHousingStockServiceDomain = createDomain(
  'inspectorHousingStockService'
);

const $currentHousingStockUpdates = inspectorHousingStockServiceDomain.createStore<
  CurrentHousingStockUpdate[]
>([]);

const updateHousingStockInspectorInfoFx = inspectorHousingStockServiceDomain.createEffect<
  PatchHousingStockInspectorInfoPayload,
  HousingStockResponse | null
>(patchHousingStockInspectorInfo);

const updateHousingStockInspectorInfo = inspectorHousingStockServiceDomain.createEvent<PatchHousingStockInspectorInfoPayload>();

export const inspectorHousingStockService = {
  inputs: {
    updateHousingStockInspectorInfo,
    updateHousingStockInspectorInfoFx,
  },
  outputs: {
    $inspectors: displayInspectorsService.outputs.$inspectorsList,
    $housingStocks:
      displayInspectorsHousingStocksService.outputs
        .$inspectorsHousingStocksList,
    $currentHousingStockUpdates,
  },
};
