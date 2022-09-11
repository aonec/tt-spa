import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { ResourceDisconnectingResponsePagedList } from 'myApi';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';
import { fetchDisablingResources } from './ResourcesDisablingScheduleService.api';

const resourceDisablingScheduleServiceDomain = createDomain(
  'ResourceDisablingScheduleService'
);

const $disablingResources = resourceDisablingScheduleServiceDomain.createStore<ResourceDisconnectingResponsePagedList | null>(
  null
);
const $filters = resourceDisablingScheduleServiceDomain.createStore<DisablingResourcesProps>(
  { PageSize: 12 }
);
const $isAddressesModalOpen = resourceDisablingScheduleServiceDomain.createStore<boolean>(
  false
);

const resourceDisablingGate = createGate<DisablingResourcesProps>();

const resourceDisablingEvent = resourceDisablingScheduleServiceDomain.createEvent();
const applyFilters = resourceDisablingScheduleServiceDomain.createEvent<DisablingResourcesProps>();
const setPage = resourceDisablingScheduleServiceDomain.createEvent<number>();
const openAddressesModal = resourceDisablingScheduleServiceDomain.createEvent();

const resourceDisablingEventFx = resourceDisablingScheduleServiceDomain.createEffect<
  DisablingResourcesProps,
  ResourceDisconnectingResponsePagedList
>(fetchDisablingResources);

$filters
  .on(applyFilters, (oldFilters, filters) => {
    return {
      ...oldFilters,
      ...filters,
      PageNumber: 1,
    };
  })
  .on(setPage, (filters, page) => ({
    ...filters,
    PageNumber: page,
  }));

$isAddressesModalOpen.on(openAddressesModal, (state) => !state);

sample({
  source: $filters,
  clock: [resourceDisablingGate.open, $filters],
  fn: (filters) => filters,
  target: resourceDisablingEventFx,
});

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
    openAddressesModal,
  },
  outputs: {
    $disablingResources,
    $loading,
    $filters,
    $isAddressesModalOpen,
  },
  gates: {
    resourceDisablingGate,
  },
};
