import { createDomain } from 'effector';

const domain = createDomain('createApartmentActService');

const $isModalOpen = domain.createStore(false);
const openModal = domain.createEvent();
const closeModal = domain.createEvent();

$isModalOpen.on(openModal, () => true).reset(closeModal);

const createDocumentFx = domain.createEffect();
const createDocument = domain.createEvent();
const $isLoading = createDocumentFx.pending;

export const createApartmentActService = {
  inputs: {
    openModal,
    closeModal,
    createDocument,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
  },
};
