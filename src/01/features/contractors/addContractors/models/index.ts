import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms';

export const $isAddContractorsModalVisible = createStore(false);
export const $isFailedAddingContractor = createStore(false);

export type OrganizationNameType = string | null;
export type OrganizationEmailType = string | null;

export const addContractorsButtonMenuClicked = createEvent();
export const addContractorsButtonClicked = createEvent();
export const cancelAddingContractorsButtonClicked = createEvent();

export const addContractorsForm = createForm({
  fields: {
    name: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value),
        },
      ],
    },
    email: {
      init: '',
      rules: [
        {
          name: 'email',
          validator: (value: string) => /\S+@\S+\.\S+/.test(value),
        },
      ],
    },
  },
  validateOn: ['submit'],
});

export const postContractorsFx = createEffect<
  {
    name: OrganizationNameType;
    email: OrganizationEmailType;
  },
  any
>();
