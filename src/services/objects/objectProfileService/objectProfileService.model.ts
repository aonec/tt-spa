import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  HousingStockResponse,
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';
import {
  fetchHousingStock,
  fetchResourceDisconnectionOnHousingStock,
} from './objectProfileService.api';
import { ObjectProfileGrouptype } from './objectProfileService.constants';
import { tasksProfileService } from '../../tasks/tasksProfileService';
import { consolidatedReportService } from './consolidatedReportService';

const domain = createDomain('objectProfileService');

const handleFetchHousingStock = domain.createEvent<number>();

const getHousingStockFx = domain.createEffect<number, HousingStockResponse>(
  fetchHousingStock,
);
const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(getHousingStockFx.doneData, (_, housingStock) => housingStock);

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
const setCurrentGroutype = domain.createEvent<ObjectProfileGrouptype>();

const $currentGrouptype = domain
  .createStore<ObjectProfileGrouptype>(ObjectProfileGrouptype.Common)
  .on(setCurrentGroutype, (_, grouptype) => grouptype);

const $isLoading = getHousingStockFx.pending;

const ObjectProfileIdGate = createGate<{ objectId: number }>();
const ObjectGroupIsOpen = createGate();
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
  from: ObjectGroupIsOpen.close,
  to: resetGrouptype,
});

forward({ from: handleFetchHousingStock, to: getHousingStockFx });

export const objectProfileService = {
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
    ObjectGroupIsOpen,
    FetchObjectGate,
  },
};
