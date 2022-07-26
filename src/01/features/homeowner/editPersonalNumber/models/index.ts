import { createGate } from 'effector-react';
import { RequestStatusShared } from './../../../readings/displayReadingHistory/hooks/useReadingValues';
import {
  HomeownerAccountCloseRequest,
  HomeownerAccountUpdateRequest,
} from './../../.../../api/types';
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
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    phoneNumber: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    openAt: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    personalAccountNumber: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    paymentCode: {
      init: null as number | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    isMainAccountingNumber: {
      init: false,
    },
  },
});

export const AutoCompleteFormGate = createGate<{ autocomplete: boolean }>();

export const PersonalNumberFormGate = createGate();

export const editHomeownerAccountEffect = createEffect<
  { id: string; data: HomeownerAccountUpdateRequest },
  void
>();

export const editHomeownerSaveButtonClicked = createEvent();

export const $isVisibleCloseHomeonwerAccountModal = createStore(false);

export const openCloseHomeonwerAccountModal = createEvent();

export const closeCloseHomeonwerAccountModal = createEvent();

export const closeHomeownerAccountFx = createEffect<
  HomeownerAccountCloseRequest,
  void
>();

export const $closeHomeownerRequestStatus = createStore<RequestStatusShared>(
  null
);

export const resetCloseHomeownerRequestStatus = createEvent();

export const closeHomeownerAccountButtonClicked = createEvent();

export const closeHomeownerAccountForm = createForm({
  fields: {
    closedAt: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
  },
});
