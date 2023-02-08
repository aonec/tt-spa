import { combine, createDomain, forward, guard, sample } from 'effector';
import {
  getCalculatorsList,
  getHousingsByFilter,
} from './displayDevicesService.api';
import {
  CalculatorListResponsePagedList,
  EOrderByRule,
  HousingByFilterResponse,
} from 'myApi';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { createGate } from 'effector-react';
import { groupDevicesByObjects } from '01/_pages/Devices/components/utils/groupDevicesByObjects';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import { DevicesSearchType } from '../devicesPageService/devicesPageService.types';

const domain = createDomain('displayDevicesService');

const $calculatorsPagedData =
  domain.createStore<CalculatorListResponsePagedList | null>(null);

const fetchHousingsByFilterFx = domain.createEffect<
  GetHousingByFilterRequestPayload[],
  HousingByFilterResponse[]
>(getHousingsByFilter);
const $housingsByFilter = domain
  .createStore<HousingByFilterResponse[]>([])
  .on(fetchHousingsByFilterFx.doneData, (_, addresses) => addresses);

const $devices = $calculatorsPagedData.map((data) =>
  groupDevicesByObjects(data?.items || []),
);

const fetchCalculatorsFx = domain.createEffect<
  CalculatorsListRequestPayload,
  CalculatorListResponsePagedList
>(getCalculatorsList);

const setDevicesProfileFilter =
  domain.createEvent<CalculatorsListRequestPayload>();

const $loading = combine(
  fetchCalculatorsFx.pending,
  fetchHousingsByFilterFx.pending,
  (...loadings) => loadings.includes(true),
);

const $searchPayload = domain.createStore<CalculatorsListRequestPayload>({
  PageNumber: 1,
  PageSize: 10,
  OrderBy: EOrderByRule.Ascending,
});

const setSerialNumber = domain.createEvent<string>();
const clearSearchPayload = domain.createEvent();

const $serialNumber = domain
  .createStore<string>('')
  .on(setSerialNumber, (_, serialNumber) => serialNumber)
  .reset(clearSearchPayload);

const setDevicesSearchType = domain.createEvent<DevicesSearchType>();
const $devicesSearchType = domain
  .createStore<DevicesSearchType>(DevicesSearchType.SearialNumber)
  .on(setDevicesSearchType, (_, type) => type);

const extendedSearchOpened = domain.createEvent();
const extendedSearchClosed = domain.createEvent();

const clearCalculators = domain.createEvent();

$calculatorsPagedData
  .on(fetchCalculatorsFx.doneData, (_, data) => data)
  .reset([fetchCalculatorsFx.failData, clearCalculators]);

const $total = $calculatorsPagedData.map((state) => state?.totalItems);
const $pageNumber = $calculatorsPagedData.map((state) => state?.pageNumber);
const $pageSize = $calculatorsPagedData.map((state) => state?.pageSize);

const setPageNumber = domain.createEvent<number>();

export const CalculatorsGate = createGate();

forward({
  from: $devicesSearchType,
  to: clearCalculators,
});

sample({
  source: $searchPayload,
  clock: CalculatorsGate.open,
  target: fetchCalculatorsFx,
});

$searchPayload
  .on(setDevicesProfileFilter, (oldFilter, filter) => ({
    ...oldFilter,
    ...filter,
  }))
  .on(setPageNumber, (state, pageNumber) => ({
    ...state,
    PageNumber: pageNumber,
  }))
  .reset(clearSearchPayload);

sample({
  source: $serialNumber,
  clock: guard({
    clock: $searchPayload,
    filter: Boolean,
  }),
  fn: (Question, payload) => ({ ...payload, PageSize: 10, Question }),
  target: fetchCalculatorsFx,
});

forward({
  from: CalculatorsGate.close,
  to: clearSearchPayload,
});

sample({
  clock: $devices.map((devices) =>
    devices.reduce((acc, device) => {
      const { city, street, corpus, number } =
        device.address?.mainAddress || {};
      if (!city || !street || !number) {
        return acc;
      }
      return [
        ...acc,
        {
          City: city,
          Street: street,
          Number: number,
          Corpus: corpus || undefined,
        },
      ];
    }, [] as GetHousingByFilterRequestPayload[]),
  ),
  target: fetchHousingsByFilterFx,
});

const $isExtendedSearchOpen = domain.createStore(false);

$isExtendedSearchOpen
  .on(extendedSearchOpened, () => true)
  .reset(extendedSearchClosed);

export const displayDevicesService = {
  inputs: {
    setDevicesProfileFilter,
    extendedSearchOpened,
    extendedSearchClosed,
    setPageNumber,
    clearSearchPayload,
    setDevicesSearchType,
    setSerialNumber,
  },
  outputs: {
    $total,
    $devices,
    $loading,
    $isExtendedSearchOpen,
    $pageNumber,
    $pageSize,
    $searchPayload,
    $housingsByFilter,
    $devicesSearchType,
    $serialNumber,
  },
  gates: {
    CalculatorsGate,
  },
};
