import { createEffect, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import { ApartmentActPaginationParameters, ApartmentActResponse } from 'myApi';

export const $apartmentActs = createStore<ApartmentActResponse[] | null>(null);

export const fetchApartmentActsFx = createEffect<
  ApartmentActPaginationParameters,
  ApartmentActResponse[] | null
>();

export const searchForm = createForm({
  fields: {
    city: { init: '' },
    street: { init: '' },
    house: { init: '' },
    apartment: { init: '' },
  },
});

export type MayBe<T> = null | T;

export const formField = <T>(): null | T => null;

export const ff = formField;

export const createActForm = createForm({
  fields: {
    actDateTime: { init: ff<string>() },
    registryNumber: {
      init: ff<string>(),
    },
    apartmentId: { init: ff<number>() },
    actJobDate: { init: ff<string>() },
  },
});
