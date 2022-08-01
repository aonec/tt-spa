import { createStore, createEffect, createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';
import { NumberIdResponse } from '../../../../api/types';
import { GetExistingHousingStockParams } from '../../../_api/housingStocks';

export const $existingApartmentNumbers = createStore<NumberIdResponse[] | null>(
  null
);

export const fetchExistingApartmentNumbersFx = createEffect<
  number,
  NumberIdResponse[] | null
>();

export const loadExistingApartmentNumbers = createEvent();

export const $existingHousingStockNumbers = createStore<
  NumberIdResponse[] | null
>(null);

export const fetchExistingHousingStockNumbers = createEffect<
  GetExistingHousingStockParams,
  NumberIdResponse[] | null
>();

export const loadExistingHousingStockNumbers = createEvent();

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

