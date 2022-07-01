import { createEvent } from 'effector';
import { createForm, Rule } from 'effector-forms';

const rules = {
  required: (): Rule<string> => ({
    name: 'required',
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: 'Это поле обязательно',
    }),
  }),
};

export const accountingNodesFilterForm = createForm({
  fields: {
    city: { init: '' },
    street: { init: '', rules: [rules.required()] },
    house: { init: '', rules: [rules.required()] },
  },
});

export const getAccountingNodesDevices = createEvent();
