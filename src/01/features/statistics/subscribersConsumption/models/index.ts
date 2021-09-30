import { createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms';

const resourceRangeInitValue = {
  from: null as string | null,
  to: null as string | null,
};

export const subscribersConsumptionFilterForm = createForm({
  fields: {
    city: { init: 'Нижнекамск' },
    street: { init: '' },
    house: { init: '' },
    coldOpen: {
      init: false,
    },
    heatOpen: { init: false },
    electricityOpen: { init: false },
    cold: {
      init: resourceRangeInitValue,
    },
    heat: {
      init: resourceRangeInitValue,
    },
    electricity: {
      init: resourceRangeInitValue,
    },
    individualDeviceCheckPeriod: {
      init: {
        from: null as string | null,
        to: null as string | null,
      },
    },
    lastReadingMonth: {
      init: null as number | null,
    },
    excludeApartments: {
      init: false,
    },
  },
});

export const $isExpandedSearchOpen = createStore(false);

export const openExpandedSearch = createEvent();
export const closeExpandedSearch = createEvent();
