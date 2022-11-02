import { combine, createDomain, guard, Store } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentByAddressFilterResponsePagedList,
  HousingByFilterResponse,
} from 'myApi';
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

const domain = createDomain('individualDevicesViewByAddressService');

const setIndividualDeviceSearchRequestPayload = domain.createEvent<SearchIndividualDevicesRequestPayload>();

const IndividualDevicesSearchGate = createGate();

const clearSearchPayload = domain.createEvent();

const fetchHousingsByFilter = domain.createEffect<
  GetHousingByFilterRequestPayload,
  HousingByFilterResponse | null
>(getHousingsByFilter);

const fetchIndividualDevicesApartments = domain.createEffect<
  GetIndividualDevicesApartments,
  ApartmentByAddressFilterResponsePagedList | null
>(getIndividualDevicesApartments);

const $individualDeviceSearchRequestPayload = domain
  .createStore<SearchIndividualDevicesRequestPayload>(searchInitialValues)
  .on(setIndividualDeviceSearchRequestPayload, (_, data) => data)
  .reset(clearSearchPayload);

const $housingsByFilter = domain
  .createStore<HousingByFilterResponse | null>(null)
  .on(fetchHousingsByFilter.doneData, (_, data) => data)
  .reset(clearSearchPayload);

const $individualDevicesApartmentsPagedData = domain
  .createStore<ApartmentByAddressFilterResponsePagedList | null>(null)
  .on(fetchIndividualDevicesApartments.doneData, (_, data) => data)
  .reset(clearSearchPayload, fetchIndividualDevicesApartments.failData);

const $getHousingsByFilterRquestPayload: Store<GetHousingByFilterRequestPayload | null> = $individualDeviceSearchRequestPayload.map(
  (values) => {
    if (!(values?.City && values?.Street && values?.HouseNumber)) return null;

    const payload: GetHousingByFilterRequestPayload = {
      City: values.City,
      Street: values.Street,
      Number: values.HouseNumber,
      Corpus: values.HouseCorpus,
    };

    return payload;
  }
);

guard({
  clock: $getHousingsByFilterRquestPayload,
  filter: (payload): payload is GetHousingByFilterRequestPayload =>
    Boolean(payload),
  target: fetchHousingsByFilter,
});

const $getIndividualDevices: Store<GetIndividualDevicesApartments | null> = combine(
  $individualDeviceSearchRequestPayload,
  $housingsByFilter
).map(([searchPayload, housingsByFilter]) => {
  const apartmentId = housingsByFilter?.current?.id;

  if (!apartmentId) return null;

  const payload: GetIndividualDevicesApartments = {
    HousingStockId: apartmentId,
    ApartmentNumber: searchPayload?.Apartment || undefined,
    'DeviceFilter.Resource': searchPayload?.Resource || undefined,
    'DeviceFilter.Model': searchPayload?.Model,
    'DeviceFilter.ClosingReason': searchPayload?.ClosingReason || undefined,
    'DeviceFilter.MountPlace': searchPayload?.MountPlace || undefined,
    'DeviceFilter.ApartmentStatus': searchPayload?.ApartmentStatus || undefined,
    'DeviceFilter.ExpiresCheckingDateAt':
      searchPayload?.ExpiresCheckingDateAt || undefined,
    'DeviceFilter.IsAlsoClosing': searchPayload?.IsAlsoClosing,
    PageNumber: 1,
    PageSize: APARTMENTS_LIST_PAGE_SIZE,
  };

  return payload;
});

guard({
  clock: $getIndividualDevices,
  filter: (payload): payload is GetIndividualDevicesApartments =>
    Boolean(payload),
  target: fetchIndividualDevicesApartments,
});

const $isHousingsByFilterLoading = fetchHousingsByFilter.pending;
const $isIndividualDevicesApartmentsLoading =
  fetchIndividualDevicesApartments.pending;

export const individualDevicesViewByAddressService = {
  inputs: {
    setIndividualDeviceSearchRequestPayload,
    clearSearchPayload,
  },
  outputs: {
    $individualDeviceSearchRequestPayload,
    $housingsByFilter,
    $isHousingsByFilterLoading,
    $individualDevicesApartmentsPagedData,
    $isIndividualDevicesApartmentsLoading,
  },
  gates: {
    IndividualDevicesSearchGate,
  },
};
