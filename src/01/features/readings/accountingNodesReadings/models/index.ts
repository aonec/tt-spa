import { createEvent } from 'effector';
import { createForm } from 'effector-forms';

export const accountingNodesFilterForm = createForm({
  fields: {
    city: { init: 'Нижнекаск' },
    street: { init: '' },
    house: { init: '' },
  },
});

export const getAccountingNodesDevices = createEvent();
