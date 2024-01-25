import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample, Store } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentByAddressFilterResponsePagedList,
  BuildingByFilterResponse,
} from 'api/types';
import { individualDevicesProfileService } from '../../../individualDevicesProfileService.model';
import {
  getHousingsByFilter,
  getIndividualDevicesApartments,
} from './individualDevicesViewByAddressService.api';
import {
  APARTMENTS_LIST_PAGE_SIZE,
  searchInitialValues,
} from './individualDevicesViewByAddressService.constatnts';
import {
  GetHousingByFilterRequestPayload,
  GetIndividualDevicesApartments,
  SearchIndividualDevicesRequestPayload,
} from './individualDevicesViewByAddressService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const setIndividualDeviceSearchRequestPayload =
  createEvent<SearchIndividualDevicesRequestPayload>();

const updateSearchPayload =
  createEvent<SearchIndividualDevicesRequestPayload>();

const IndividualDevicesSearchGate = createGate();

const clearSearchPayload = createEvent();

const setPageNumber = createEvent<number>();

const fetchHousingsByFilterFx = createEffect<
  GetHousingByFilterRequestPayload,
  BuildingByFilterResponse | null,
  EffectFailDataAxiosError
>(getHousingsByFilter);

const fetchIndividualDevicesApartments = createEffect<
  GetIndividualDevicesApartments,
  ApartmentByAddressFilterResponsePagedList | null
>(getIndividualDevicesApartments);

const $individualDeviceSearchRequestPayload =
  createStore<SearchIndividualDevicesRequestPayload>(searchInitialValues)
    .on(setIndividualDeviceSearchRequestPayload, (_, data) => data)
    .on(updateSearchPayload, (prev, data) => ({ ...prev, ...data }))
    .reset(clearSearchPayload);

const $housingsByFilter = createStore<BuildingByFilterResponse | null>(null)
  .on(fetchHousingsByFilterFx.doneData, (_, data) => data)
  .reset(clearSearchPayload);

const $individualDevicesApartmentsPagedData =
  createStore<ApartmentByAddressFilterResponsePagedList | null>(null)
    .on(fetchIndividualDevicesApartments.doneData, (_, data) => data)
    .reset(clearSearchPayload, fetchIndividualDevicesApartments.failData);

const $pageNumber = createStore<number>(1)
  .on(setPageNumber, (_, pageNumber) => pageNumber)
  .reset($individualDeviceSearchRequestPayload);

const $getHousingsByFilterRequestPayload: Store<GetHousingByFilterRequestPayload | null> =
  $individualDeviceSearchRequestPayload.map((values) => {
    if (!(values?.City && values?.Street && values?.HouseNumber)) return null;

    const payload: GetHousingByFilterRequestPayload = {
      City: values.City,
      Street: values.Street,
      Number: values.HouseNumber,
      Corpus: values.HouseCorpus,
    };

    return payload;
  });

sample({
  clock: $getHousingsByFilterRequestPayload,
  filter: (payload): payload is GetHousingByFilterRequestPayload =>
    Boolean(payload),
  target: fetchHousingsByFilterFx,
});

const $getIndividualDevicesApartmentsRequestPayload: Store<GetIndividualDevicesApartments | null> =
  combine(
    $individualDeviceSearchRequestPayload,
    $housingsByFilter,
    $pageNumber,
  ).map(([searchPayload, housingsByFilter, pageNumber]) => {
    const housingStockId = housingsByFilter?.current?.id;

    if (!housingStockId) return null;

    const payload: GetIndividualDevicesApartments = {
      HousingStockId: housingStockId,
      ApartmentNumber: searchPayload?.Apartment || undefined,
      'DeviceFilter.Resource': searchPayload?.Resource || undefined,
      'DeviceFilter.Model': searchPayload?.Model,
      'DeviceFilter.ClosingReason': searchPayload?.ClosingReason || undefined,
      'DeviceFilter.MountPlace': searchPayload?.MountPlace || undefined,
      'DeviceFilter.ApartmentStatus':
        searchPayload?.ApartmentStatus || undefined,
      'DeviceFilter.ExpiresCheckingDateAt':
        searchPayload?.ExpiresCheckingDateAt || undefined,
      'DeviceFilter.IsAlsoClosing': searchPayload?.IsAlsoClosing,
      PageNumber: pageNumber,
      PageSize: APARTMENTS_LIST_PAGE_SIZE,
    };

    return payload;
  });

sample({
  clock: $getIndividualDevicesApartmentsRequestPayload,
  filter: (payload): payload is GetIndividualDevicesApartments =>
    Boolean(payload),
  target: fetchIndividualDevicesApartments,
});

fetchHousingsByFilterFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const $isHousingsByFilterLoading = fetchHousingsByFilterFx.pending;
const $isIndividualDevicesApartmentsLoading =
  fetchIndividualDevicesApartments.pending;

export const individualDevicesViewByAddressService = {
  inputs: {
    setIndividualDeviceSearchRequestPayload,
    clearSearchPayload,
    setPageNumber,
    updateSearchPayload,
  },
  outputs: {
    $individualDeviceSearchRequestPayload,
    $housingsByFilter,
    $isHousingsByFilterLoading,
    $individualDevicesApartmentsPagedData,
    $isIndividualDevicesApartmentsLoading,
    $pageNumber,
    $mountPlaces: individualDevicesProfileService.outputs.$mountPlaces,
  },
  gates: {
    IndividualDevicesSearchGate,
  },
};
