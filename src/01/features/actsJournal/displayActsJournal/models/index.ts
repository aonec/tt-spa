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
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';

export type MayBe<T> = null | T;

export const formField = <T>(init?: T): null | T => init || null;

export const ff = formField;

export const ffInit = <T>(init?: T) => ({
  init: ff<T>(init),
});

export const $apartmentActsPaged = createStore<ApartmentActResponsePagedList | null>(
  null
);

export const $apartmentActs = $apartmentActsPaged.map(
  (pagedData) => pagedData?.items
);

export const $actJournalPageNumber = createStore(1);

export const setActJournalPageNumber = createEvent<number>();

export type CreateApartmentActPayload = {
  actType: EActType;
  actResourceType: EActResourceType;
  registryNumber: string;
  actJobDate: string;
};

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
    city: {
      init: (() => {
        const cities = $existingCities.getState();

        return cities && cities[cities?.length - 1];
      })(),
    },
    street: { init: '' },
    house: { init: '' },
    apartment: { init: '' },
    ActDateOrderBy: ffInit<EOrderByRule>(EOrderByRule.Descending),
    ActJobDateOrderBy: ffInit<EOrderByRule>(),
    RegistryNumberOrderBy: ffInit<EOrderByRule>(),
    AddressOrderBy: ffInit<EOrderByRule>(),
  },
});


export const createApartmentAct = createEvent<CreateApartmentActPayload>();
export const createApartmentActFx = createEffect<
  AddApartmentActRequest,
  void
>();

export const refetchApartmentActs = createEvent();

export const clearCreationActForms = createEvent();

export const $selectedActType = createStore<EActType | null>(null);
export const $selectedResourceType = createStore<EActResourceType | null>(null);

export const selectActType = createEvent<EActType>();
export const selectResourceType = createEvent<EActResourceType>();

$selectedActType
  .on(selectActType, (_, actType) => actType)
  .reset(clearCreationActForms);
$selectedResourceType
  .on(selectResourceType, (_, resourceType) => resourceType)
  .reset(clearCreationActForms);

export const expandedFilterForm = createForm({
  fields: {
    allowedActTypes: { init: [] as EActType[] },
    allowedActResources: { init: [] as EActResourceType[] },
  },
});

export const ActJournalGate = createGate<ApartmentActPaginationParameters>();

export const clearFilters = createEvent();
