import { createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms';

export const subscribersConsumptionFilterForm = createForm({
  fields: {
    city: { init: 'Нижнекамск' },
    street: { init: '' },
    house: { init: '' },
  },
});

export const $isExpandedSearchOpen = createStore(false);

export const openExpandedSearch = createEvent();
export const closeExpandedSearch = createEvent();
