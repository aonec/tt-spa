import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { ResourceDisconnectingResponsePagedList } from 'api/types';
import {
  DisablingResourcesFilters,
  DisablingResourcesQueryParams,
} from './ResourceDisablingScheduleService.types';
import { fetchDisablingResources } from './ResourceDisablingScheduleService.api';
import { getResourceDisconnectionQueryParams } from './ResourceDisablingScheduleService.utils';
import { debounce } from 'patronum';

const resourceDisablingGate = createGate<DisablingResourcesFilters>();

const setFilters = createEvent<DisablingResourcesFilters>();
const setPage = createEvent<number>();

const handleSubmit = createEvent<DisablingResourcesQueryParams>();
const debouncedSubmit = debounce({ source: handleSubmit, timeout: 500 });

const refetchResourceDisconnections = createEvent();
const getResourceDisconnectionsFx = createEffect<
  DisablingResourcesQueryParams,
  ResourceDisconnectingResponsePagedList
>(fetchDisablingResources);

const $disablingResources =
  createStore<ResourceDisconnectingResponsePagedList | null>(null).on(
    getResourceDisconnectionsFx.doneData,
    (_, resources) => resources,
  );

const $filters = createStore<DisablingResourcesFilters>({ PageSize: 12 })
  .on(setFilters, (_, filters) => {
    return {
      ...filters,
      PageNumber: 1,
    };
  })
  .on(setPage, (filters, page) => ({
    ...filters,
    PageNumber: page,
  }));

sample({
  source: $filters,
  clock: [resourceDisablingGate.open, $filters, refetchResourceDisconnections],
  fn: getResourceDisconnectionQueryParams,
  target: handleSubmit,
});

sample({
  source: $filters,
  clock: sample({
    source: resourceDisablingGate.status,
    clock: refetchResourceDisconnections,
    filter: (isOpen) => isOpen,
  }),
  fn: getResourceDisconnectionQueryParams,
  target: handleSubmit,
});

sample({
  clock: debouncedSubmit,
  target: getResourceDisconnectionsFx,
});

const $loading = getResourceDisconnectionsFx.pending;

export const resourceDisablingScheduleServiceService = {
  inputs: {
    setFilters,
    setPage,
    refetchResourceDisconnections,
  },
  outputs: {
    $disablingResources,
    $loading,
    $filters,
  },
  gates: {
    resourceDisablingGate,
  },
};
