import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms';
import { SubscriberStatisticsСonsumptionResponse } from '../../api/types';

export const $selectedHousingsStockId = createStore<number | null>(null);

export const $consumptionStatistics = createStore<
  SubscriberStatisticsСonsumptionResponse[] | null
>(null);

export const fetchConsumptionStatistics = createEffect<
  {
    HousingStockId: number;
    MonthOfLastTransmission?: string | null;
    HotWaterSupply?: boolean | null;
    ColdWaterSupply?: boolean | null;
    Electricity?: boolean | null;
  },
  SubscriberStatisticsСonsumptionResponse[]
>();

export const ConsumptionStatisticsGate = createGate<{
  HousingStockId: number;
  MonthOfLastTransmission?: string | null;
  HotWaterSupply?: boolean | null;
  ColdWaterSupply?: boolean | null;
  Electricity?: boolean | null;
}>();

export const setSelectedHousingStockId = createEvent<number | null>();

const resourceRangeInitValue = {
  from: null as number | null,
  to: null as number | null,
};

export const subscribersConsumptionFindForm = createForm({
  fields: {
    city: { init: '' },
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
      init: null as string | null,
    },
    excludeApartments: {
      init: false,
    },
  },
});

export const $isExpandedSearchOpen = createStore(false);

export const openExpandedSearch = createEvent();
export const closeExpandedSearch = createEvent();
