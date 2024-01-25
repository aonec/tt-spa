import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { apartmentActsListService } from '../apartmentActsListService';
import { deleteApartmentAct } from './deleteApartmentActService.api';

const openModal = createEvent<number>();
const closeModal = createEvent();

const $actId = createStore(0);
$actId.on(openModal, (_, id) => id).reset(closeModal);
const $isModalOpen = $actId.map(Boolean);

const deleteAct = createEvent();
const deleteActFx = createEffect<number, void>(deleteApartmentAct);
const $deleteActIsLoading = deleteActFx.pending;

sample({
  source: $actId,
  clock: deleteAct,
  target: deleteActFx,
});

sample({
  clock: deleteActFx.doneData,
  target: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

export const deleteApartmentActService = {
  inputs: {
    openModal,
    closeModal,
    deleteAct,
  },
  outputs: {
    $isModalOpen,
    $deleteActIsLoading,
  },
};
