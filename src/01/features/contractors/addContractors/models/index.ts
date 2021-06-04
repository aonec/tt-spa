import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms';

export const $isAddContractorsModalVisible = createStore(false);

export type OrganizationNameType = string | null;
export type OrganizationEmailType = string | null;

// export const $organizationName = createStore<OrganizationNameType>(null);
// export const $organizationEmail = createStore<OrganizationEmailType>(null);

export const addContractorsButtonMenuClicked = createEvent();
export const addContractorsButtonClicked = createEvent();
export const cancelAddingContractorsButtonClicked = createEvent();

export const addContractorsForm = createForm({
  fields: {
    email: {
      init: '', // field's store initial value
      rules: [
        {
          name: 'email',
          validator: (value: string) => {
            return true;
          },
          validateOn: ['change'],
        },
      ],
    },
    name: {
      init: '', // field's store initial value
      rules: [
        // {
        //     name: "required",
        //     validator: (value: string) => Boolean(value),
        // }
      ],
    },
  },
  validateOn: ['submit', 'change'],
});

export const postContractorsFx = createEffect<
    {
      name: OrganizationNameType;
      email: OrganizationEmailType;
    },
  any
>();
