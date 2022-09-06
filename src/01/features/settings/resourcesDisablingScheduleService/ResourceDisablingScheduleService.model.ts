import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { sample } from 'lodash';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';
import { fetchDisablingResources } from './ResourcesDisablingScheduleService.api';

const resourceDisablingScheduleServiceDomain = createDomain(
  'ResourceDisablingScheduleService'
);

const $disablingResources = resourceDisablingScheduleServiceDomain.createStore<ResourceDisconnectingResponsePagedList | null>(
  null
);
const $filters = resourceDisablingScheduleServiceDomain.createStore<DisablingResourcesProps>(
  { PageSize: 20 }
);

const resourceDisablingGate = createGate<DisablingResourcesProps | null>();

const resourceDisablingEvent = resourceDisablingScheduleServiceDomain.createEvent();
const applyFilters = resourceDisablingScheduleServiceDomain.createEvent<DisablingResourcesProps>();
const setPage = resourceDisablingScheduleServiceDomain.createEvent<number>();

const resourceDisablingEventFx = resourceDisablingScheduleServiceDomain.createEffect<
  DisablingResourcesProps | unknown,
  ResourceDisconnectingResponsePagedList
>(fetchDisablingResources);

$filters
  .on(applyFilters, (_, filters) => ({
    ...filters,
    pageNumber: 1,
  }))
  .on(setPage, (filters, page) => ({
    ...filters,
    pageNumber: page,
  }));

forward({
  from: [resourceDisablingGate.open, $filters],
  to: resourceDisablingEventFx,
});

//Почему так не работает ?
// sample({
//   source: $filters,
//   clock: [resourceDisablingGate.open, $filters],
//   target: resourceDisablingEventFx,
// });

$disablingResources.on(
  resourceDisablingEventFx.doneData,
  (_, resources) => resources
);

const $loading = resourceDisablingEventFx.pending;

export const resourceDisablingScheduleServiceService = {
  inputs: {
    resourceDisablingEvent,
    applyFilters,
    resourceDisablingEventFx,
    setPage,
  },
  outputs: {
    $disablingResources,
    $loading,
  },
  gates: {
    resourceDisablingGate,
  },
};
