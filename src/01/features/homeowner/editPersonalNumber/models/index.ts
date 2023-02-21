import { createGate } from 'effector-react';
import { RequestStatusShared } from './../../../readings/displayReadingHistory/hooks/useReadingValues';
import {
  HomeownerAccountCloseRequest,
  HomeownerAccountUpdateRequest,
} from './../../../../../myApi';
import { createStore, createEvent, createEffect } from 'effector';
import { createForm } from 'effector-forms/dist';
import {
  EffectFailDataAxiosError,
  EffectFailDataAxiosErrorDataApartmentId,
} from 'types';

export const $isSelectEditPersonalNumberTypeModalOpen = createStore(false);

export const openEditPersonalNumberTypeModal = createEvent();
export const closeEditPersonalNumberTypeModal = createEvent();

export const $editRequestStatus = createStore<null | RequestStatusShared>(null);

export const setEditRequestStatus = createEvent<null | RequestStatusShared>();

export const handleConfirmationModalClose = createEvent();
export const onForced = createEvent();
export const $samePersonalAccountNumderId = createStore<number | null>(null);
export const $isConfirmationModalOpen =
  $samePersonalAccountNumderId.map(Boolean);
export const $isForced = createStore<boolean>(false);

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
  void,
  EffectFailDataAxiosErrorDataApartmentId
>();

export const editHomeownerSaveButtonClicked = createEvent();

export const $isVisibleCloseHomeonwerAccountModal = createStore(false);

export const openCloseHomeonwerAccountModal = createEvent();

export const closeCloseHomeonwerAccountModal = createEvent();

export const handleEditHomeownerAccount = createEvent();

export const closeHomeownerAccountFx = createEffect<
  HomeownerAccountCloseRequest,
  void,
  EffectFailDataAxiosError
>();

export const $closeHomeownerRequestStatus =
  createStore<RequestStatusShared>(null);

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
