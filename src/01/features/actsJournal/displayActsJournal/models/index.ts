import {
  EActType,
  EActResourceType,
  EOrderByRule,
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
} from './../../../../../myApi';
import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import { ApartmentActResponse } from 'myApi';
import moment from 'moment';
import { createGate } from 'effector-react';

export type MayBe<T> = null | T;

export const formField = <T>(): null | T => null;

export const ff = formField;

export const $apartmentActsPaged = createStore<ApartmentActResponsePagedList | null>(
  null
);

export const $apartmentActs = $apartmentActsPaged.map(
  (pagedData) => pagedData?.items
);

export interface ApartmentActPaginationParameters {
  City?: string | null;
  Street?: string | null;
  HousingStockNumber?: string | null;
  Corpus?: string | null;
  ApartmentNumber?: string | null;
  ActTypes?: EActType[] | null;
  ActResourceTypes?: EActResourceType[] | null;
  ActDateOrderBy?: EOrderByRule | null;
  ActJobDateOrderBy?: EOrderByRule | null;
  RegistryNumberOrderBy?: EOrderByRule | null;
  AddressOrderBy?: EOrderByRule | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export const fetchApartmentActsFx = createEffect<
  ApartmentActPaginationParameters,
  ApartmentActResponsePagedList | null
>();

export const searchForm = createForm({
  fields: {
    city: { init: '' },
    street: { init: '' },
    house: { init: '' },
    apartment: { init: '' },
  },
});

export const createActForm = createForm({
  fields: {
    actType: { init: ff<EActType>() },
    actResourceType: { init: ff<EActResourceType>() },
    actDateTime: { init: ff<string>() },
    registryNumber: {
      init: ff<string>(),
    },
    actJobDate: { init: ff<moment.Moment>() },
  },
});

export const clearCreationActFormValues = createEvent();

export const createApartmentActFx = createEffect<
  AddApartmentActRequest,
  void
>();

export const refetchApartmentActs = createEvent();

export const clearCreationActForms = createEvent();

export const expandedFilterForm = createForm({
  fields: {
    allowedActTypes: { init: [] as EActType[] },
    allowedActResources: { init: [] as EActResourceType[] },
  },
});

export const ActJournalGate = createGate<ApartmentActPaginationParameters>();
