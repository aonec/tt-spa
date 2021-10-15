import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms';
import { SubscriberStatisticsСonsumptionResponse } from 'myApi';

export const $consumptionStatistics = createStore<
  SubscriberStatisticsСonsumptionResponse[] | null
>(null);

export const fetchConsumptionStatistics = createEffect<
  { id: number; month?: string },
  SubscriberStatisticsСonsumptionResponse[]
>();

export const ConsumptionStatisticsGate = createGate<{
  housingStockId: number;
  month?: string;
}>();

const resourceRangeInitValue = {
  from: null as string | null,
  to: null as string | null,
};

export const subscribersConsumptionFindForm = createForm({
  fields: {
    city: { init: 'Нижнекамск' },
    street: { init: '' },
    house: { init: '' },
  },
});

export const subscribersConsumptionFilterForm = createForm({
  fields: {
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
