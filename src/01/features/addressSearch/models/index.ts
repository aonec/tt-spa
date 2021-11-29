import { createStore, createEffect, createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $selectedSearchApartmentId = createStore<number | null>(null);

export const fetchSearchApartmentIdFx = createEffect();

export const findApartmentId = createEvent();

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
