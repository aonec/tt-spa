import { createDomain, forward, sample } from 'effector';
import { apartmentActsListService } from '../apartmentActsListService';
import { deleteApartmentAct } from './deleteApartmentActService.api';

const domain = createDomain('deleteApartmentActService');
const openModal = domain.createEvent<number>();
const closeModal = domain.createEvent();

const $actId = domain.createStore(0);
$actId.on(openModal, (_, id) => id).reset(closeModal);
const $isModalOpen = $actId.map(Boolean);

const deleteAct = domain.createEvent();
const deleteActFx = domain.createEffect<number, void>(deleteApartmentAct);
const $deleteActIsLoading = deleteActFx.pending;

sample({
  source: $actId,
  clock: deleteAct,
  target: deleteActFx,
});

forward({
  from: deleteActFx.doneData,
  to: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
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
