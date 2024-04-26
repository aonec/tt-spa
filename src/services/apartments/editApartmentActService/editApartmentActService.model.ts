import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
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

const openModal = createEvent<ApartmentActResponse>();
const closeModal = createEvent();

const handleSubmitForm = createEvent<EditActFormPayload>();

const $act = createStore<ApartmentActResponse | null>(null)
  .on(openModal, (_, act) => act)
  .reset(closeModal);

const $isModalOpen = $act.map(Boolean);

const deleteActDocument = createEvent();
const deleteActDocumentFx = createEffect<number, void>(fetchDeleteActDocument);

const editActFx = createEffect<EditActRequestPayload, void>(updateApartmentAct);

const $editActIsLoading = combine(
  editActFx.pending,
  deleteActDocumentFx.pending,
  (...loading) => loading.includes(true),
);

sample({
  clock: [editActFx.doneData, deleteActDocumentFx.doneData],
  target: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

sample({
  source: sample({
    source: $act.map((data) => data?.id),
    filter: Boolean,
  }),
  clock: deleteActDocument,
  target: deleteActDocumentFx,
});

sample({
  source: sample({
    source: $act.map((data) => data?.id),
    filter: Boolean,
  }),
  clock: handleSubmitForm,
  fn: (actId, act) => ({ actId, act }),
  target: editActFx,
});

export const editApartmentActService = {
  inputs: {
    closeModal,
    openModal,
    deleteActDocument,
    handleSubmitForm,
  },
  outputs: {
    $isModalOpen,
    $editActIsLoading,
    $act,
  },
};
