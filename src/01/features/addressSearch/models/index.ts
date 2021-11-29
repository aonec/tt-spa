import { createForm } from 'effector-forms/dist';

export const addressSearchForm = createForm({
  fields: {
    street: {
      init: '',
    },
    house: {
      init: '',
    },
    apartment: {
      init: '',
    },
  },
});
