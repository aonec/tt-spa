import { createEvent } from 'effector';
import { createForm } from 'effector-forms';

export const accountingNodesFilterForm = createForm({
  fields: {
    city: { init: 'Нижнекамск' },
    street: { init: '' },
    house: { init: '' },
  },
});

export const getAccountingNodesDevices = createEvent();
