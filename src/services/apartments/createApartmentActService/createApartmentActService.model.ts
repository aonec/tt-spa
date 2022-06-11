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

const createAct = domain.createEvent<CreateActFormPayload>();
const createActFx = domain.createEffect<AddApartmentActRequest, void>(
  postApartmentAct
);

const $createActIsLoading = createActFx.pending;

sample({
  source: apartmentActsListService.gates.ApartmentActsListGate.state,
  clock: createAct,
  fn: (sourcePayload, clockPayload) => ({
    ...sourcePayload,
    ...clockPayload,
  }),
  target: createActFx,
});

forward({
  from: createActFx.doneData,
  to: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

export const createApartmentActService = {
  inputs: {
    openModal,
    closeModal,
    createAct,
  },
  outputs: {
    $isModalOpen,
    $createActIsLoading,
    $actTypes,
  },
};
