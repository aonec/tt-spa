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

const getHousingStockFx = domain.createEffect<number, HousingStockResponse>(
  fetchHousingStock
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
  (isAdministrator) => isAdministrator
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
  (_, disconnectionPagedData) => disconnectionPagedData.items || []
);

const resetGrouptype = domain.createEvent();
const setCurrentGroutype = domain.createEvent<ObjectProfileGrouptype>();

const $currentGrouptype = domain
  .createStore<ObjectProfileGrouptype>(ObjectProfileGrouptype.Common)
  .on(setCurrentGroutype, (_, grouptype) => grouptype);

const $isLoading = getHousingStockFx.pending;

const ObjectProfileIdGate = createGate<{ objectId: number }>();
const ObjectGroupIsOpen = createGate();

forward({
  from: ObjectProfileIdGate.open.map(({ objectId }) => objectId),
  to: [getResourceDisconnectionsFx, getHousingStockFx],
});

forward({
  from: ObjectGroupIsOpen.close,
  to: resetGrouptype,
});

export const objectProfileService = {
  inputs: {
    setCurrentGroutype,
    openConsolidatedReportModal:
      consolidatedReportService.inputs.openConsolidatedReportModal,
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
  },
};
