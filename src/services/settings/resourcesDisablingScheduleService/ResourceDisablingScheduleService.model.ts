import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { ResourceDisconnectingResponsePagedList } from 'api/types';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';
import { fetchDisablingResources } from './ResourcesDisablingScheduleService.api';

const resourceDisablingGate = createGate<DisablingResourcesProps>();

const setFilters = createEvent<DisablingResourcesProps>();
const setPage = createEvent<number>();

const refetchResourceDisconnections = createEvent();
const getResourceDisconnectionsFx = createEffect<
  DisablingResourcesProps,
  ResourceDisconnectingResponsePagedList
>(fetchDisablingResources);

const $disablingResources =
  createStore<ResourceDisconnectingResponsePagedList | null>(null).on(
    getResourceDisconnectionsFx.doneData,
    (_, resources) => resources,
  );

const $filters = createStore<DisablingResourcesProps>({ PageSize: 12 })
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
  target: getResourceDisconnectionsFx,
});

sample({
  source: $filters,
  clock: sample({
    source: resourceDisablingGate.status,
    clock: refetchResourceDisconnections,
    filter: (isOpen) => isOpen,
  }),
  fn: (filters) => filters,
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
