import { createEvent, createStore } from 'effector';
import { StreetWithBuildings } from 'services/settings/resourcesDisablingScheduleService/views/displayResourceDisconenctionAddressesServiceService/views/AddressesList/AddressesList.types';

const closeModal = createEvent();
const openModal = createEvent<StreetWithBuildings[]>();
const $selectedAddresses = createStore<StreetWithBuildings[]>([])
  .on(openModal, (_, streets) => streets)
  .reset(closeModal);

const $isOpen = $selectedAddresses.map((streets) => Boolean(streets.length));

export const showSelectedAddressesService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: {
    $isOpen,
    $selectedAddresses,
  },
};
