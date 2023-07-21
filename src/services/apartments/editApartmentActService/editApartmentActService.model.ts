import { combine, createDomain, forward, guard, sample } from 'effector';
import { ApartmentActResponse } from 'api/types';
import { apartmentActsListService } from '../apartmentActsListService';
import {
  fetchDeleteActDocument,
  updateApartmentAct,
} from './editApartmentActService.api';
import {
  EditActFormPayload,
  EditActRequestPayload,
} from './editApartmentActService.types';

const domain = createDomain('editApartmentActService');

const openModal = domain.createEvent<ApartmentActResponse>();
const closeModal = domain.createEvent();

const $act = domain
  .createStore<ApartmentActResponse | null>(null)
  .on(openModal, (_, act) => act)
  .reset(closeModal);

const $isModalOpen = $act.map(Boolean);

const deleteActDocument = domain.createEvent();
const deleteActDocumentFx = domain.createEffect<number, void>(
  fetchDeleteActDocument,
);

const editAct = domain.createEvent<EditActFormPayload>();
const editActFx = domain.createEffect<EditActRequestPayload, void>(
  updateApartmentAct,
);

const $editActIsLoading = combine(
  editActFx.pending,
  deleteActDocumentFx.pending,
  (...loading) => loading.includes(true),
);

forward({
  from: [editActFx.doneData, deleteActDocumentFx.doneData],
  to: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

sample({
  source: guard({
    source: $act.map((data) => data?.id),
    filter: Boolean,
  }),
  clock: deleteActDocument,
  target: deleteActDocumentFx,
});

sample({
  source: guard({
    source: $act.map((data) => data?.id),
    filter: Boolean,
  }),
  clock: editAct,
  fn: (actId, act) => ({ actId, act }),
  target: editActFx,
});

export const editApartmentActService = {
  inputs: {
    closeModal,
    openModal,
    editAct,
    deleteActDocument,
  },
  outputs: {
    $isModalOpen,
    $editActIsLoading,
    $act,
  },
};
