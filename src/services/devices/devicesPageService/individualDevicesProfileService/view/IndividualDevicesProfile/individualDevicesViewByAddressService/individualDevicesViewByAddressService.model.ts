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
  GetHousingByFilterRequestPayload,
  GetIndividualDevicesApartments,
  SearchIndividualDevicesRequestPayload,
} from './individualDevicesViewByAddressService.types';

const domain = createDomain('individualDevicesViewByAddressService');

const setIndividualDeviceSearchRquestPayload = domain.createEvent<SearchIndividualDevicesRequestPayload>();

const IndividualDevicesSearchGate = createGate();

const fetchHousingsByFilter = domain.createEffect<
  GetHousingByFilterRequestPayload,
  HousingByFilterResponse | null
>(getHousingsByFilter);

const fetchIndividualDevicesApartments = domain.createEffect<
  GetIndividualDevicesApartments,
  ApartmentByAddressFilterResponsePagedList | null
>(getIndividualDevicesApartments);

const $individualDevicesApartmentsPagedData = domain
  .createStore<ApartmentByAddressFilterResponsePagedList | null>(null)
  .on(fetchIndividualDevicesApartments.doneData, (_, data) => data)
  .reset(IndividualDevicesSearchGate.close);

const $individualDeviceSearchRquestPayload = domain
  .createStore<SearchIndividualDevicesRequestPayload | null>(null)
  .on(setIndividualDeviceSearchRquestPayload, (_, data) => data)
  .reset(IndividualDevicesSearchGate.close);

const $housingsByFilter = domain
  .createStore<HousingByFilterResponse | null>(null)
  .on(fetchHousingsByFilter.doneData, (_, data) => data)
  .reset(IndividualDevicesSearchGate.close);

const $getHousingsByFilterRquestPayload: Store<GetHousingByFilterRequestPayload | null> = $individualDeviceSearchRquestPayload.map(
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
  $individualDeviceSearchRquestPayload,
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
    PageSize: 10,
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
    setIndividualDeviceSearchRquestPayload,
  },
  outputs: {
    $housingsByFilter,
    $isHousingsByFilterLoading,
    $individualDevicesApartmentsPagedData,
    $isIndividualDevicesApartmentsLoading,
  },
  gates: {
    IndividualDevicesSearchGate,
  },
};
