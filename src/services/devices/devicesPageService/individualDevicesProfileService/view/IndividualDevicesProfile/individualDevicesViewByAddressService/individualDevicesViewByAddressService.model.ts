import { combine, createDomain, guard, Store } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentByAddressFilterResponsePagedList,
  HousingByFilterResponse,
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

const domain = createDomain('individualDevicesViewByAddressService');

const setIndividualDeviceSearchRequestPayload =
  domain.createEvent<SearchIndividualDevicesRequestPayload>();

const updateSearchPayload =
  domain.createEvent<SearchIndividualDevicesRequestPayload>();

const IndividualDevicesSearchGate = createGate();

const clearSearchPayload = domain.createEvent();

const setPageNumber = domain.createEvent<number>();

const fetchHousingsByFilterFx = domain.createEffect<
  GetHousingByFilterRequestPayload,
  HousingByFilterResponse | null,
  EffectFailDataAxiosError
>(getHousingsByFilter);

const fetchIndividualDevicesApartments = domain.createEffect<
  GetIndividualDevicesApartments,
  ApartmentByAddressFilterResponsePagedList | null
>(getIndividualDevicesApartments);

const $individualDeviceSearchRequestPayload = domain
  .createStore<SearchIndividualDevicesRequestPayload>(searchInitialValues)
  .on(setIndividualDeviceSearchRequestPayload, (_, data) => data)
  .on(updateSearchPayload, (prev, data) => ({ ...prev, ...data }))
  .reset(clearSearchPayload);

const $housingsByFilter = domain
  .createStore<HousingByFilterResponse | null>(null)
  .on(fetchHousingsByFilterFx.doneData, (_, data) => data)
  .reset(clearSearchPayload);

const $individualDevicesApartmentsPagedData = domain
  .createStore<ApartmentByAddressFilterResponsePagedList | null>(null)
  .on(fetchIndividualDevicesApartments.doneData, (_, data) => data)
  .reset(clearSearchPayload, fetchIndividualDevicesApartments.failData);

const $pageNumber = domain
  .createStore<number>(1)
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

guard({
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

guard({
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
