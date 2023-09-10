import { combine, createDomain, forward, sample } from 'effector';
import {
  getNodesListQuery,
  getHousingsByFilter,
} from './displayDevicesService.api';
import {
  BuildingByFilterResponse,
  EOrderByRule,
  NodesPagedList,
} from 'api/types';
import { createGate } from 'effector-react';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import { DevicesSearchType } from '../devicesPageService/devicesPageService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { groupDevicesByObjects } from 'utils/groupDevicesByObjects';
import { NodesListRequestPayload } from './displayDevicesService.types';

const domain = createDomain('displayDevicesService');

const $nodesPagedData = domain.createStore<NodesPagedList | null>(null);

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

const $devices = $nodesPagedData.map((data) =>
  groupDevicesByObjects(data?.pipeNodes || []),
);

const setDevicesProfileFilter = domain.createEvent<NodesListRequestPayload>();

const $loading = combine(
  getNodesListQuery.$pending,
  fetchHousingsByFilterFx.pending,
  (...loadings) => loadings.includes(true),
);

const $searchPayload = domain.createStore<NodesListRequestPayload>({
  PageNumber: 1,
  PageSize: 20,
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
  .on(setDevicesSearchType, (_, type) => type)
  .reset(clearSearchPayload);

const extendedSearchOpened = domain.createEvent();
const extendedSearchClosed = domain.createEvent();

const clearCalculators = domain.createEvent();

$nodesPagedData
  .on(getNodesListQuery.$data, (_, data) => data)
  .reset([getNodesListQuery.finished.failure, clearCalculators]);

const $total = $nodesPagedData.map((state) => state?.totalItems);
const $pageNumber = $nodesPagedData.map((state) => state?.pageNumber);
const $pageSize = $nodesPagedData.map((state) => state?.pageSize);

const setPageNumber = domain.createEvent<number>();

export const CalculatorsGate = createGate();

forward({
  from: $devicesSearchType,
  to: clearCalculators,
});

sample({
  source: $searchPayload,
  clock: CalculatorsGate.open,
  target: getNodesListQuery.start,
});

$searchPayload
  .on(setDevicesProfileFilter, (oldFilter, filter) => ({
    ...oldFilter,
    ...filter,
    PageNumber: 1,
  }))
  .on(setPageNumber, (state, pageNumber) => ({
    ...state,
    PageNumber: pageNumber,
  }))
  .reset(clearSearchPayload);

sample({
  source: combine($serialNumber, $searchPayload, (Question, payload) => ({
    ...payload,
    PageSize: 20,
    'DevicesFilter.Question': Question,
  })),
  clock: sample({
    source: $devicesSearchType,
    clock: $searchPayload,
    filter: (type, payload) =>
      type === DevicesSearchType.Address
        ? Boolean(payload['Address.Street'])
        : true,
  }),
  target: getNodesListQuery.start,
});

sample({
  clock: CalculatorsGate.close,
  target: [clearSearchPayload, getNodesListQuery.reset],
});

sample({
  clock: $devicesSearchType,
  target: getNodesListQuery.reset,
});

sample({
  source: $searchPayload,
  clock: $devices,
  fn: (filter, devices) =>
    devices.reduce((acc, device) => {
      const address = device.building?.address;
      let currentAddress = address?.mainAddress;

      if (filter['Address.Street']) {
        currentAddress =
          [address?.mainAddress, ...(address?.additionalAddresses || [])].find(
            (address) => address?.street === filter['Address.Street'],
          ) || currentAddress;
      }
      const { city, street, corpus, number } = currentAddress || {};

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
