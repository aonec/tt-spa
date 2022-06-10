import { $actTypes } from '01/features/actsJournal/displayActTypes/models';
import { createDomain, forward, sample } from 'effector';
import { AddApartmentActRequest } from 'myApi';
import { apartmentActsListService } from '../apartmentActsListService';
import { postApartmentAct } from './createApartmentActService.api';
import { CreateActFormPayload } from './createApartmentActService.types';

const domain = createDomain('createApartmentActService');

const $isModalOpen = domain.createStore(false);
const openModal = domain.createEvent();
const closeModal = domain.createEvent();

$isModalOpen.on(openModal, () => true).reset(closeModal);

const createDocument = domain.createEvent<CreateActFormPayload>();
const createDocumentFx = domain.createEffect<AddApartmentActRequest, void>(
  postApartmentAct
);

const $createActIsLoading = createDocumentFx.pending;

sample({
  source: apartmentActsListService.gates.ApartmentActsListGate.state,
  clock: createDocument,
  fn: (sourcePayload, clockPayload) => ({
    ...sourcePayload,
    ...clockPayload,
  }),
  target: createDocumentFx,
});

forward({
  from: createDocumentFx.doneData,
  to: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

export const createApartmentActService = {
  inputs: {
    openModal,
    closeModal,
    createDocument,
  },
  outputs: {
    $isModalOpen,
    $createActIsLoading,
    $actTypes,
  },
};
