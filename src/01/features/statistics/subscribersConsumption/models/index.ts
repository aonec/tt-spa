import { createForm } from 'effector-forms';

export const subscribersConsumptionFilterForm = createForm({
  fields: {
    city: { init: 'Нижнекамск' },
    street: { init: '' },
    house: { init: '' },
  },
});
