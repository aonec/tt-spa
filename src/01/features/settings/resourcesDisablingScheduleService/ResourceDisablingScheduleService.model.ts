import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { ResourceDisconnectingResponsePagedList } from 'myApi';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';
import { fetchDisablingResources } from './ResourcesDisablingScheduleService.api';

const domain = createDomain('ResourceDisablingScheduleService');

const $disablingResources = domain.createStore<ResourceDisconnectingResponsePagedList | null>(
  null
);

const resourceDisablingGate = createGate<DisablingResourcesProps>();

const resourceDisablingEvent = domain.createEvent();
const applyFilters = domain.createEvent<DisablingResourcesProps>();
const setPage = domain.createEvent<number>();

const openAddressesModal = domain.createEvent();
const closeAddressesModal = domain.createEvent();

const resourceDisablingEventFx = domain.createEffect<
  DisablingResourcesProps,
  ResourceDisconnectingResponsePagedList
>(fetchDisablingResources);

const $filters = domain
  .createStore<DisablingResourcesProps>({ PageSize: 12 })
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

const $isAddressesModalOpen = domain
  .createStore<boolean>(false)
  .on(openAddressesModal, () => true)
  .on(closeAddressesModal, () => false);

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
    closeAddressesModal,
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
