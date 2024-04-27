import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { ApartmentActResponse, EActResourceType, EActType } from 'api/types';
import { apartmentActsListService } from '../apartmentActsListService';
import {
  fetchDeleteActDocument,
  updateApartmentAct,
} from './editApartmentActService.api';
import {
  EditActFormPayload,
  EditActRequestPayload,
} from './editApartmentActService.types';
import { createForm } from 'effector-forms';
import { required } from 'api/formRules';

const openModal = createEvent<ApartmentActResponse>();
const closeModal = createEvent();

const $act = createStore<ApartmentActResponse | null>(null)
  .on(openModal, (_, act) => act)
  .reset(closeModal);

const $isModalOpen = $act.map(Boolean);

const deleteActDocument = createEvent();
const deleteActDocumentFx = createEffect<number, void>(fetchDeleteActDocument);

const editActForm = createForm<EditActFormPayload>({
  fields: {
    actJobDate: {
      init: '' as string,
      rules: [required()],
    },
    registryNumber: {
      init: '' as string,
      rules: [required()],
    },
    actResourceType: {
      init: EActResourceType.All,
      rules: [required()],
    },
    actType: {
      init: EActType.Admission,
      rules: [required()],
    },
    documentId: {
      init: null,
    },
  },
  validateOn: ['submit'],
});

const editActFx = createEffect<EditActRequestPayload, void>(updateApartmentAct);

const $editActIsLoading = combine(
  editActFx.pending,
  deleteActDocumentFx.pending,
  (...loading) => loading.includes(true),
);

sample({
  clock: $act,
  fn: (values) => ({ ...values, document: values?.document?.id }),
  target: editActForm.setInitialForm,
});

sample({
  clock: [editActFx.doneData, deleteActDocumentFx.doneData],
  target: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

sample({
  clock: closeModal,
  target: editActForm.reset,
});

const $actId = $act.map((act) => act?.id || null);

sample({
  source: sample({
    source: $actId,
    filter: Boolean,
  }),
  clock: deleteActDocument,
  target: deleteActDocumentFx,
});

sample({
  source: sample({
    source: $act.map((data) => data?.id || null),
    filter: Boolean,
  }),
  clock: editActForm.formValidated,
  fn: (actId, act) => ({ actId, act }),
  target: editActFx,
});

export const editApartmentActService = {
  inputs: {
    closeModal,
    openModal,
    deleteActDocument,
  },
  outputs: {
    $isModalOpen,
    $editActIsLoading,
    $act,
  },
  forms: {
    editActForm,
  },
};
