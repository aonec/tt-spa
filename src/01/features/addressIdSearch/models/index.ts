import { createStore, createEffect, createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $apartmentSearchId = createStore<number | null>(null);

export const fetchApartmentSearchIdFx = createEffect();

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
