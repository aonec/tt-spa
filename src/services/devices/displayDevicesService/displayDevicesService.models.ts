import { combine, createDomain, forward, guard, sample } from 'effector';
import {
  getCalculatorsListQuery,
  getHousingsByFilter,
} from './displayDevicesService.api';
import {
  BuildingByFilterResponse,
  CalculatorListResponsePagedList,
  EOrderByRule,
} from 'api/types';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { createGate } from 'effector-react';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import { DevicesSearchType } from '../devicesPageService/devicesPageService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { groupDevicesByObjects } from 'utils/groupDevicesByObjects';

const domain = createDomain('displayDevicesService');

const $calculatorsPagedData =
  domain.createStore<CalculatorListResponsePagedList | null>(null);

const fetchHousingsByFilterFx = domain.createEffect<
  GetHousingByFilterRequestPayload[],
  (BuildingByFilterResponse | null)[],
  EffectFailDataAxiosError
>(getHousingsByFilter);
const $housingsByFilter = domain
  .createStore<BuildingByFilterResponse[]>([])
  .on(fetchHousingsByFilterFx.doneData, (_, addresses) =>
    addresses.reduce((acc, elem) => {
      if (!elem) {
        return acc;
      }
      return [...acc, elem];
    }, [] as BuildingByFilterResponse[]),
  );

const $devices = $calculatorsPagedData.map((data) =>
  groupDevicesByObjects(data?.items || []),
);

const setDevicesProfileFilter =
  domain.createEvent<CalculatorsListRequestPayload>();

const $loading = combine(
  getCalculatorsListQuery.$pending,
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
  .on(getCalculatorsListQuery.$data, (_, data) => data)
  .reset([getCalculatorsListQuery.finished.failure, clearCalculators]);

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
  target: getCalculatorsListQuery.start,
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
  target: getCalculatorsListQuery.start,
});

sample({
  clock: CalculatorsGate.close,
  target: [clearSearchPayload, getCalculatorsListQuery.reset],
});

sample({
  clock: $devices.map((devices) =>
    devices.reduce((acc, device) => {
      const { city, street, corpus, number } =
        device.building?.address?.mainAddress || {};
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

fetchHousingsByFilterFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
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
