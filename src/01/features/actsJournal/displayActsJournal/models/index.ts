import {
  EActType,
  EActResourceType,
  EOrderByRule,
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
} from './../../../../../myApi';
import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import moment from 'moment';
import { createGate } from 'effector-react';

export type MayBe<T> = null | T;

export const formField = <T>(): null | T => null;

export const ff = formField;

export const ffInit = <T>() => ({
  init: ff<T>(),
});

export const $apartmentActsPaged = createStore<ApartmentActResponsePagedList | null>(
  null
);

export const $apartmentActs = $apartmentActsPaged.map(
  (pagedData) => pagedData?.items
);

export const $actJournalPageNumber = createStore(1);

export const setActJournalPageNumber = createEvent<number>();

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

export type ActOrderFieldName =
  | 'ActDateOrderBy'
  | 'ActJobDateOrderBy'
  | 'RegistryNumberOrderBy'
  | 'AddressOrderBy';

export const searchForm = createForm({
  fields: {
    city: { init: '' },
    street: { init: '' },
    house: { init: '' },
    apartment: { init: '' },
    ActDateOrderBy: ffInit<EOrderByRule>(),
    ActJobDateOrderBy: ffInit<EOrderByRule>(),
    RegistryNumberOrderBy: ffInit<EOrderByRule>(),
    AddressOrderBy: ffInit<EOrderByRule>(),
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
