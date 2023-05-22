import { individualDeviceMetersInputService } from 'services/meters/individualDeviceMetersInputService';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  GetHousingStocksListRequestPayload,
  GetHousingStocksRequestPayload,
  GetIndividualDevicesListRequestPayload,
} from './HousesReadingsService.types';
import {
  EIndividualDeviceOrderRule,
  EResourceType,
  HousingStockResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';
import {
  getHousingStock,
  getIndividualDevicesList,
} from './HousesReadingsService.api';
import { managementFirmConsumptionRatesService } from 'services/meters/managementFirmConsumptionRatesService';
import { openReadingsHistoryModal } from '01/features/readings/displayReadingHistory/models/index';
import { inspectorService } from 'services/inspectors/inspectorService';

const domain = createDomain('housesReadingsService');

const HousingStockGate = createGate<{ housingStockId: number | null }>();

const handleSearchHousingStock =
  domain.createEvent<GetHousingStocksListRequestPayload>();

const loadNextPageOfIndividualDevicesList = domain.createEvent();

const fetchHousingStockFx = domain.createEffect<
  GetHousingStocksRequestPayload,
  HousingStockResponse | null
>(getHousingStock);

const fetchIndividualDevicesFx = domain.createEffect<
  GetIndividualDevicesListRequestPayload,
  IndividualDeviceListItemResponsePagedList
>(getIndividualDevicesList);

const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(fetchHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(HousingStockGate.close);

const $individualDevicesPagedList = domain
  .createStore<IndividualDeviceListItemResponsePagedList | null>(null)
  .on(fetchIndividualDevicesFx.doneData, (_, data) => data)
  .reset(HousingStockGate.close, $housingStock);

const $individualDevices = domain
  .createStore<IndividualDeviceListItemResponse[]>([])
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

const $individualDevicesPageNumber = domain
  .createStore(1)
  .on(fetchIndividualDevicesFx.doneData, (pageNumber) => pageNumber + 1)
  .reset(HousingStockGate.close, $housingStock);

guard({
  clock: handleSearchHousingStock,
  filter: ({ City, Street, HousingStockNumber }) => {
    return [City, Street, HousingStockNumber].every(Boolean);
  },
  target: fetchHousingStockFx,
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
  target: fetchHousingStockFx,
});

sample({
  clock: guard({
    clock: guard({
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

forward({
  from: $housingStock,
  to: loadNextPageOfIndividualDevicesList,
});

const $isLoadingHousingStock = fetchHousingStockFx.pending;

const $isLoadingIndividualDevices = fetchIndividualDevicesFx.pending;

const $isAllDevicesLoaded = combine(
  $individualDevicesPagedList,
  $individualDevices,
  (data, devices) =>
    typeof data?.totalItems === 'number' && data.totalItems === devices.length,
);

const handleHousingStockLoaded = fetchHousingStockFx.doneData;

export const housesReadingsService = {
  inputs: {
    handleSearchHousingStock,
    loadNextPageOfIndividualDevicesList,
    loadManagemenFirmConsumptionRates:
      managementFirmConsumptionRatesService.inputs
        .loadManagemenFirmConsumptionRates,
    openReadingsHistoryModal,
    handleHousingStockLoaded,
  },
  outputs: {
    $housingStock,
    $isLoadingHousingStock,
    $inspector: inspectorService.outputs.$inspector,
    $individualDevices,
    $isAllDevicesLoaded,
    $isLoadingIndividualDevices,
    $consumptionRates:
      managementFirmConsumptionRatesService.outputs.$consumptionRates,
  },
  gates: {
    HousingStockGate,
    InspectorGate: inspectorService.gates.InspectorGate,
  },
};
