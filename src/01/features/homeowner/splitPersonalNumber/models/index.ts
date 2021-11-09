import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import { createGate } from 'effector-react';

export const splitPersonalNumberFx = createEffect();

export const $splitPersonalNumberStageNumber = createStore<number>(1);

export const setSplitPersonalNumberStage = createEvent<number>();

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

export const SplitPersonalNumberGate = createGate();

export const nextSplitPersonalNumberPage = createEvent();
export const previousSplitPersonalNumberPage = createEvent();

export const saveSplitPersonalNumberForm = createEvent();

