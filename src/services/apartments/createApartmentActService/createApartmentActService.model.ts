import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { AddApartmentActRequest } from 'api/types';
import { apartmentActsListService } from '../apartmentActsListService';
import { postApartmentAct } from './createApartmentActService.api';
import { CreateActFormPayload } from './createApartmentActService.types';

const $isModalOpen = createStore(false);
const openModal = createEvent();
const closeModal = createEvent();

const handleSubmit = createEvent<CreateActFormPayload>();

$isModalOpen.on(openModal, () => true).reset(closeModal);

const createActFx = createEffect<AddApartmentActRequest, void>(
  postApartmentAct,
);

const $createActIsLoading = createActFx.pending;

sample({
  source: apartmentActsListService.gates.ApartmentActsListGate.state,
  clock: handleSubmit,
  fn: (apartmentId, createActPayload) => ({
    ...apartmentId,
    ...createActPayload,
  }),
  target: createActFx,
});

sample({
  clock: createActFx.doneData,
  target: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

export const createApartmentActService = {
  inputs: {
    openModal,
    closeModal,
    handleSubmit,
  },
  outputs: {
    $isModalOpen,
    $createActIsLoading,
  },
};
