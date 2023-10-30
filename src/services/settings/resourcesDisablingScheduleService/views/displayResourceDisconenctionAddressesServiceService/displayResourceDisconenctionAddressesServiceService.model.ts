import { createEvent, createStore } from 'effector';
import { ResourceDisconnectingResponse } from 'api/types';
import { StreetWithBuildings } from './views/AddressesList/AddressesList.types';
import { prepareAddresses } from './displayResourceDisconenctionAddressesServiceService.utils';

const openModal = createEvent<ResourceDisconnectingResponse>();
const closeModal = createEvent();

const $disconnection = createStore<ResourceDisconnectingResponse | null>(null)
  .on(openModal, (_, disconnection) => disconnection)
  .reset(closeModal);

const $addresses = createStore<StreetWithBuildings[]>([])
  .on(openModal, (_, disconnection) => {
    if (!disconnection) {
      return [];
    }

    const buildings = disconnection.buildings || [];
    const result = prepareAddresses(buildings);

    return result;
  })
  .reset(closeModal);

export const displayResourceDisconenctionAddressesServiceService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: {
    $addresses,
    $disconnection,
  },
};
