import { createStore, createEffect, createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';

export interface FindApartmentIdQueryPayload {
  City: string;
  Street: string;
  HousingNumber: string;
  HousingCorpus?: string | null;
  ApartmentNumber: string;
}

export const $apartmentSearchId = createStore<number | null>(null);

export const fetchApartmentSearchIdFx = createEffect<
  FindApartmentIdQueryPayload,
  number | null
>();

export const onExitAddressSearchForm = createEvent();

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

export const $error = createStore<boolean>(false)