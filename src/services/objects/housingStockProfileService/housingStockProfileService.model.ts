import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  HousingStockResponse,
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'api/types';
import {
  fetchHousingStock,
  fetchResourceDisconnectionOnHousingStock,
} from './housingStockProfileService.api';
import { HousingStockProfileGrouptype } from './housingStockProfileService.constants';
import { tasksProfileService } from '../../tasks/tasksProfileService';
import { consolidatedReportService } from './consolidatedReportService';

const domain = createDomain('objectProfileService');
const ObjectProfileIdGate = createGate<{ objectId: number }>();

const handleFetchHousingStock = domain.createEvent<number>();

const getHousingStockFx = domain.createEffect<number, HousingStockResponse>(
  fetchHousingStock,
);
const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(getHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(ObjectProfileIdGate.close);

const $taskCount = $housingStock.map((housingStock) => {
  return housingStock?.numberOfTasks || 0;
});

const $housingStockId = $housingStock.map((housingStock) => {
  return housingStock?.id || null;
});

const $isAdministrator = tasksProfileService.outputs.$isAdministrator.map(
  (isAdministrator) => isAdministrator,
);

const $resourceDisconnections = domain.createStore<
  ResourceDisconnectingResponse[]
>([]);

const getResourceDisconnectionsFx = domain.createEffect<
  number,
  ResourceDisconnectingResponsePagedList
>(fetchResourceDisconnectionOnHousingStock);

$resourceDisconnections.on(
  getResourceDisconnectionsFx.doneData,
  (_, disconnectionPagedData) => disconnectionPagedData.items || [],
);

const resetGrouptype = domain.createEvent();
const setCurrentGroutype = domain.createEvent<HousingStockProfileGrouptype>();

const $currentGrouptype = domain
  .createStore<HousingStockProfileGrouptype>(
    HousingStockProfileGrouptype.Common,
  )
  .on(setCurrentGroutype, (_, grouptype) => grouptype);

const $isLoading = getHousingStockFx.pending;

const FetchObjectGate = createGate<{ objectId: number }>();

forward({
  from: ObjectProfileIdGate.open.map(({ objectId }) => objectId),
  to: [getResourceDisconnectionsFx, getHousingStockFx],
});

forward({
  from: FetchObjectGate.open.map(({ objectId }) => objectId),
  to: getHousingStockFx,
});

forward({
  from: ObjectProfileIdGate.close,
  to: resetGrouptype,
});

forward({ from: handleFetchHousingStock, to: getHousingStockFx });

export const housingStockProfileService = {
  inputs: {
    setCurrentGroutype,
    openConsolidatedReportModal:
      consolidatedReportService.inputs.openConsolidatedReportModal,
    handleFetchHousingStock,
  },
  outputs: {
    $housingStock,
    $isLoading,
    $currentGrouptype,
    $taskCount,
    $housingStockId,
    $isAdministrator,
  },
  gates: {
    ObjectProfileIdGate,
    FetchObjectGate,
  },
};
