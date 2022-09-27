import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { ResourceDisconnectingResponsePagedList } from 'myApi';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';
import { fetchDisablingResources } from './ResourcesDisablingScheduleService.api';

const domain = createDomain('ResourceDisablingScheduleService');

const resourceDisablingGate = createGate<DisablingResourcesProps>();

const applyFilters = domain.createEvent<DisablingResourcesProps>();
const setPage = domain.createEvent<number>();

const openAddressesModal = domain.createEvent();
const closeAddressesModal = domain.createEvent();

const refetchResourceDisconnections = domain.createEvent();
const getResourceDisconnectionsFx = domain.createEffect<
  DisablingResourcesProps,
  ResourceDisconnectingResponsePagedList
>(fetchDisablingResources);

const $disablingResources = domain
  .createStore<ResourceDisconnectingResponsePagedList | null>(null)
  .on(getResourceDisconnectionsFx.doneData, (_, resources) => resources);

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
  clock: [resourceDisablingGate.open, $filters, refetchResourceDisconnections],
  fn: (filters) => filters,
  target: getResourceDisconnectionsFx,
});

const $loading = getResourceDisconnectionsFx.pending;

export const resourceDisablingScheduleServiceService = {
  inputs: {
    applyFilters,
    setPage,
    openAddressesModal,
    closeAddressesModal,
    refetchResourceDisconnections,
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
