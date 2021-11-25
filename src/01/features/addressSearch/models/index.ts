import { createForm } from 'effector-forms/dist';

export const addressSearchForm = createForm({
  fields: {
    city: {
      init: '',
    },
    street: {
      init: '',
    },
    apartment: {
      init: '',
    },
  },
});
