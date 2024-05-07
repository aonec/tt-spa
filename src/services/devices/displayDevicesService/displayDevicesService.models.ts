import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import {
  getNodesListQuery,
  getHousingsByFilter,
  getModels,
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
import { GetMeteringDevicesModelsRequest } from '../individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.types';
import { NodesListRequestPayload } from './displayDevicesService.types';

const $nodesPagedData = createStore<NodesPagedList | null>(null);

const fetchHousingsByFilterFx = createEffect<
  GetHousingByFilterRequestPayload[],
  (BuildingByFilterResponse | null)[],
  EffectFailDataAxiosError
>(getHousingsByFilter);
const $housingsByFilter = createStore<BuildingByFilterResponse[]>([]).on(
  fetchHousingsByFilterFx.doneData,
  (_, addresses) =>
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

const handleFetchModels = createEvent<string>();

const getModelsFx = createEffect<GetMeteringDevicesModelsRequest, string[]>(
  getModels,
);

const $calculatorsModels = createStore<string[]>([]).on(
  getModelsFx.doneData,
  (_, models) => models,
);

sample({
  clock: handleFetchModels,
  filter: Boolean,
  fn: (Text) => ({ Text }),
  target: getModelsFx,
});

const setDevicesProfileFilter = createEvent<NodesListRequestPayload>();

const $loading = combine(
  getNodesListQuery.$pending,
  fetchHousingsByFilterFx.pending,
  (...loadings) => loadings.includes(true),
);

const $searchPayload = createStore<NodesListRequestPayload>({
  PageNumber: 1,
  PageSize: 20,
  OrderBy: EOrderByRule.Ascending,
});

const setSerialNumber = createEvent<string>();
const clearSearchPayload = createEvent();

const $serialNumber = createStore<string>('')
  .on(setSerialNumber, (_, serialNumber) => serialNumber)
  .reset(clearSearchPayload);

const setDevicesSearchType = createEvent<DevicesSearchType>();
const $devicesSearchType = createStore<DevicesSearchType>(
  DevicesSearchType.SearialNumber,
)
  .on(setDevicesSearchType, (_, type) => type)
  .reset(clearSearchPayload);

const extendedSearchOpened = createEvent();
const extendedSearchClosed = createEvent();

const clearCalculators = createEvent();

$nodesPagedData
  .on(getNodesListQuery.$data, (_, data) => data)
  .reset([getNodesListQuery.finished.failure, clearCalculators]);

const $total = $nodesPagedData.map((state) => state?.totalItems || null);
const $pageNumber = $nodesPagedData.map((state) => state?.pageNumber || null);
const $pageSize = $nodesPagedData.map((state) => state?.pageSize || null);

const setPageNumber = createEvent<number>();

export const CalculatorsGate = createGate();

sample({
  clock: $devicesSearchType,
  target: clearCalculators,
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

const $isExtendedSearchOpen = createStore(false);

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
    handleFetchModels,
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
    $calculatorsModels,
  },
  gates: {
    CalculatorsGate,
  },
};
