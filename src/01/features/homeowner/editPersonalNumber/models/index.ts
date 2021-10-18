import { RequestStatusShared } from './../../../readings/displayReadingHistory/hooks/useReadingValues';
import { HomeownerAccountUpdateRequest } from './../../../../../myApi';
import { createStore, createEvent, createEffect } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $isSelectEditPersonalNumberTypeModalOpen = createStore(false);

export const openEditPersonalNumberTypeModal = createEvent();
export const closeEditPersonalNumberTypeModal = createEvent();

export const $editRequestStatus = createStore<null | RequestStatusShared>(null);

export const setEditRequestStatus = createEvent<null | RequestStatusShared>();

export const personalNumberEditForm = createForm({
  fields: {
    name: {
      init: '',
    },
    phoneNumber: {
      init: '',
    },
    openAt: {
      init: null as string | null,
    },
    personalAccountNumber: {
      init: null as string | null,
    },
    paymentCode: {
      init: null as number | null,
    },
    isMainAccountingNumber: {
      init: false,
    },
  },
});

export const editHomeownerAccountEffect = createEffect<
  { id: string; data: HomeownerAccountUpdateRequest },
  void
>();

export const editHomeownerSaveButtonClicked = createEvent();
