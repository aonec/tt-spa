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
import { InspectorGate, $inspector } from '01/features/Inspectors/models';
import { managementFirmConsumptionRatesService } from 'services/meters/managementFirmConsumptionRatesService';
import { openReadingsHistoryModal } from '01/features/readings/displayReadingHistory/models/index';

const domain = createDomain('housesReadingsService');

const HousingStockGate = createGate<{ housingStockId: number | null }>();

const handleSearchHousingStock = domain.createEvent<GetHousingStocksListRequestPayload>();

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
    items ? [...prev, ...items] : prev
  )
  .reset(HousingStockGate.close, $housingStock);

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

guard({
  clock: HousingStockGate.open.map(({ housingStockId }) => ({
    HousingStockId: housingStockId,
  })),
  filter: ({ HousingStockId }) => Boolean(HousingStockId),
  target: fetchHousingStockFx,
});

sample({
  clock: guard({
    clock: loadNextPageOfIndividualDevicesList,
    source: combine($individualDevicesPageNumber, $housingStock),
    filter: (
      data: [number, HousingStockResponse | null]
    ): data is [number, HousingStockResponse] => Boolean(data[1]),
  }),
  fn: ([pageNumber, housingStock]) => ({
    HousingStockId: housingStock?.id,
    Resource: EResourceType.Electricity,
    IsOpened: true,
    OrderRule: EIndividualDeviceOrderRule.ApartmentNumber,
    PageNumber: pageNumber,
    PageSize: 15,
  }),
  target: fetchIndividualDevicesFx,
});

forward({
  from: $housingStock,
  to: loadNextPageOfIndividualDevicesList,
});

const $isLoadingHousingStock = fetchHousingStockFx.pending;

const $isLoadingIndividualDevices = fetchIndividualDevicesFx.pending;

export const housesReadingsService = {
  inputs: {
    handleSearchHousingStock,
    loadNextPageOfIndividualDevicesList,
    loadManagemenFirmConsumptionRates:
      managementFirmConsumptionRatesService.inputs
        .loadManagemenFirmConsumptionRates,
    openReadingsHistoryModal,
  },
  outputs: {
    $housingStock,
    $isLoadingHousingStock,
    $inspector,
    $individualDevices,
    $individualDevicesPagedList,
    $isLoadingIndividualDevices,
    $consumptionRates:
      managementFirmConsumptionRatesService.outputs.$consumptionRates,
  },
  gates: {
    HousingStockGate,
    InspectorGate,
  },
};
