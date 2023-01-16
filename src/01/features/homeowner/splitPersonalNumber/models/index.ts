import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import { createGate } from 'effector-react';
import { HomeownerAccountSplitRequest } from 'myApi';

export const splitPersonalNumberFx = createEffect<
  HomeownerAccountSplitRequest,
  void
>();

export const $splitPersonalNumberStageNumber = createStore<number>(1);

export const setSplitPersonalNumberStage = createEvent<number>();

export const $checkedExistingApartmentId = createStore<number | null>(null);

export const $isConfirmExistingApartmentModalOpen = $checkedExistingApartmentId.map(
  Boolean
);

export const closeConfirmExistingApartmentModal = createEvent();

export const transferDevicesForm = createForm({
  fields: {
    individualDeviceIdsForSwitch: {
      init: [] as number[],
    },
  },
});

export const homeownerAccountForSplittedApartmentForm = createForm({
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
    },
    isMainAccountingNumber: {
      init: false,
    },
  },
});

export const newApartmentPersonalNumberForm = createForm({
  fields: {
    apartmentNumber: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
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
    },
    isMainAccountingNumber: {
      init: false,
    },
  },
});

export const SplitPersonalNumberGate = createGate();

export const nextSplitPersonalNumberPage = createEvent();
export const previousSplitPersonalNumberPage = createEvent();

export const saveSplitPersonalNumberForm = createEvent<boolean>();

export const checkApartmentExistingFx = createEffect<
  {
    housingStockId: number;
    apartmentNumber: string;
  },
  number | null
>();

export const splitPersonalNumber = createEvent<boolean>();
