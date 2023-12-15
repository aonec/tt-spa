import { createEffect, createEvent, createStore } from 'effector';
import { individualDeviceMetersInputService } from 'services/meters/individualDeviceMetersInputService';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  GetHousingStocksListRequestPayload,
  GetIndividualDevicesListRequestPayload,
} from './HousesReadingsService.types';
import {
  EIndividualDeviceOrderRule,
  EResourceType,
  HousingStockResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'api/types';
import {
  getHousingStockQuery,
  getIndividualDevicesList,
} from './HousesReadingsService.api';
import { managementFirmConsumptionRatesService } from 'services/meters/managementFirmConsumptionRatesService';
import { inspectorService } from 'services/inspectors/inspectorService';
import { readingsHistoryService } from 'services/meters/readingsHistoryService/readingsHistoryService.model';

const HousingStockGate = createGate<{ housingStockId: number | null }>();

const handleSearchHousingStock =
  createEvent<GetHousingStocksListRequestPayload>();

const loadNextPageOfIndividualDevicesList = createEvent();

const fetchIndividualDevicesFx = createEffect<
  GetIndividualDevicesListRequestPayload,
  IndividualDeviceListItemResponsePagedList
>(getIndividualDevicesList);

const $housingStock = getHousingStockQuery.$data;

const $individualDevicesPagedList =
  createStore<IndividualDeviceListItemResponsePagedList | null>(null)
    .on(fetchIndividualDevicesFx.doneData, (_, data) => data)
    .reset(HousingStockGate.close, $housingStock);

const $individualDevices = createStore<IndividualDeviceListItemResponse[]>([])
  .on(fetchIndividualDevicesFx.doneData, (prev, { items }) =>
    items ? [...prev, ...items] : prev,
  )
  .reset(HousingStockGate.close, $housingStock)
  .on(
    individualDeviceMetersInputService.inputs.uploadMeterFx.done,
    (prev, { params, result: readingResponse }) => {
      return prev.map((device) => {
        if (device.id !== params.meter.deviceId) return device;

        const deviceReadings = device.readings || [];

        return { ...device, readings: [...deviceReadings, readingResponse] };
      });
    },
  );

const $individualDevicesPageNumber = createStore(1)
  .on(fetchIndividualDevicesFx.doneData, (pageNumber) => pageNumber + 1)
  .reset(HousingStockGate.close, $housingStock);

sample({
  clock: handleSearchHousingStock,
  filter: ({ City, Street, BuildingNumber }) => {
    return [City, Street, BuildingNumber].every(Boolean);
  },
  target: getHousingStockQuery.start,
});

sample({
  source: HousingStockGate.state.map(({ housingStockId }) => ({
    HousingStockId: housingStockId,
  })),
  clock: sample({
    source: $housingStock,
    clock: HousingStockGate.state,
    filter: (housingStock, { housingStockId }) =>
      Boolean(housingStockId && housingStockId !== housingStock?.id),
  }),
  target: getHousingStockQuery.start,
});

sample({
  clock: sample({
    clock: sample({
      source: combine(
        $individualDevices,
        $individualDevicesPagedList,
        fetchIndividualDevicesFx.pending,
      ),
      clock: loadNextPageOfIndividualDevicesList,
      filter: ([individualDevices, pagedData, isLoading]) => {
        if (isLoading) return false;

        if (!pagedData?.totalItems) return true;

        return individualDevices.length < pagedData.totalItems;
      },
    }),
    source: combine($individualDevicesPageNumber, $housingStock),
    filter: (
      data: [number, HousingStockResponse | null],
    ): data is [number, HousingStockResponse] => Boolean(data[1]),
  }),
  fn: ([pageNumber, housingStock]) => ({
    HousingStockId: housingStock?.id,
    Resource: EResourceType.Electricity,
    IsOpened: true,
    OrderRule: EIndividualDeviceOrderRule.ApartmentNumber,
    PageNumber: pageNumber,
    PageSize: 25,
  }),
  target: fetchIndividualDevicesFx,
});

sample({
  clock: $housingStock,
  target: loadNextPageOfIndividualDevicesList,
});

sample({
  clock: HousingStockGate.close,
  target: getHousingStockQuery.reset,
});

const $isLoadingHousingStock = getHousingStockQuery.$pending;

const $isLoadingIndividualDevices = fetchIndividualDevicesFx.pending;

const $isAllDevicesLoaded = combine(
  $individualDevicesPagedList,
  $individualDevices,
  (data, devices) =>
    typeof data?.totalItems === 'number' && data.totalItems === devices.length,
);

const $totalItems = $individualDevicesPagedList.map(
  (list) => list?.totalItems || 0,
);

const handleHousingStockLoaded = getHousingStockQuery.finished.success;

export const housesReadingsService = {
  inputs: {
    handleSearchHousingStock,
    loadNextPageOfIndividualDevicesList,
    loadManagemenFirmConsumptionRates:
      managementFirmConsumptionRatesService.inputs
        .loadManagemenFirmConsumptionRates,
    openReadingsHistoryModal:
      readingsHistoryService.inputs.openReadingsHistoryModal,
    handleHousingStockLoaded,
  },
  outputs: {
    $housingStock,
    $isLoadingHousingStock,
    $inspector: inspectorService.outputs.$inspector,
    $individualDevices,
    $isAllDevicesLoaded,
    $isLoadingIndividualDevices,
    $totalItems,
    $consumptionRates:
      managementFirmConsumptionRatesService.outputs.$consumptionRates,
  },
  gates: {
    HousingStockGate,
    InspectorGate: inspectorService.gates.InspectorGate,
  },
};
