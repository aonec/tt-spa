import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  ESecuredIdentityRoleName,
  HousingStockResponse,
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'api/types';
import {
  fetchHousingStock,
  fetchResourceDisconnectionOnHousingStock,
} from './housingStockProfileService.api';
import { consolidatedReportService } from './consolidatedReportService';
import { currentUserService } from 'services/currentUserService';

const ObjectProfileIdGate = createGate<{ objectId: number }>();

const handleFetchHousingStock = createEvent<number>();

const getHousingStockFx = createEffect<number, HousingStockResponse>(
  fetchHousingStock,
);
const $housingStock = createStore<HousingStockResponse | null>(null)
  .on(getHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(ObjectProfileIdGate.close);

const $taskCount = $housingStock.map((housingStock) => {
  return housingStock?.numberOfTasks || 0;
});

const $housingStockId = $housingStock.map((housingStock) => {
  return housingStock?.id || null;
});

const $isAdministrator = currentUserService.outputs.$currentUser.map((user) => {
  const roles = user?.roles || [];
  const rolesKeys = roles.map(({ key }) => key);
  const isAdministrator =
    rolesKeys.includes(ESecuredIdentityRoleName.Administrator) ||
    rolesKeys.includes(
      ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
    );

  return isAdministrator;
});

const $resourceDisconnections = createStore<ResourceDisconnectingResponse[]>(
  [],
);

const getResourceDisconnectionsFx = createEffect<
  number,
  ResourceDisconnectingResponsePagedList
>(fetchResourceDisconnectionOnHousingStock);

$resourceDisconnections
  .on(
    getResourceDisconnectionsFx.doneData,
    (_, disconnectionPagedData) => disconnectionPagedData.items || [],
  )
  .reset(ObjectProfileIdGate.close);

const $isLoading = getHousingStockFx.pending;

const FetchObjectGate = createGate<{ objectId: number }>();

sample({
  clock: ObjectProfileIdGate.open.map(({ objectId }) => objectId),
  target: [getResourceDisconnectionsFx, getHousingStockFx],
});

sample({
  clock: FetchObjectGate.open.map(({ objectId }) => objectId),
  target: getHousingStockFx,
});

sample({ clock: handleFetchHousingStock, target: getHousingStockFx });

export const housingStockProfileService = {
  inputs: {
    openConsolidatedReportModal:
      consolidatedReportService.inputs.openConsolidatedReportModal,
    handleFetchHousingStock,
  },
  outputs: {
    $housingStock,
    $isLoading,
    $taskCount,
    $housingStockId,
    $isAdministrator,
    $resourceDisconnections,
  },
  gates: {
    ObjectProfileIdGate,
    FetchObjectGate,
  },
};
