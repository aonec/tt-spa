import { resourceDisablingScheduleServiceService } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { message } from 'antd';
import { combine, createDomain, forward, sample, split } from 'effector';
import {
  ResourceDisconnectingCreateRequest,
  StreetWithHousingStockNumbersResponsePagedList,
  StreetWithHousingStockNumbersResponse,
  EResourceDisconnectingType,
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { chooseTypeOfResourceDisconnectionModalService } from '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';
import { resourceDisconnectionFiltersService } from '../resourceDisconnectionFiltersService';
import {
  fetchCreateResourceDisconnection,
  fetchExistingHousingStocks,
  fetchExistingHousingStocksWithHeatingStation,
  fetchExistingHousingStocksWithHouseManagement,
} from './createResourceDisconnectionService.api';
import { EAddressDetails } from './createResourceDisconnectionService.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const domain = createDomain('createResourceDisconnectionService');

const $resourceTypes =
  resourceDisconnectionFiltersService.outputs.$resourceDisconnectionFilters.map(
    (store) => store?.resourceTypes || [],
  );
const $disconnectingTypes = combine(
  chooseTypeOfResourceDisconnectionModalService.outputs.$isInterHeatingSeason,
  resourceDisconnectionFiltersService.outputs.$resourceDisconnectionFilters,
  (isInterHeatingSeason, filter) => {
    const types = filter?.disconnectingTypes;

    if (!types) {
      return [];
    }
    if (isInterHeatingSeason) {
      return types.filter(
        (type) => type.key === EResourceDisconnectingType.InterHeatingSeason,
      );
    }
    return types.filter(
      (type) => type.key !== EResourceDisconnectingType.InterHeatingSeason,
    );
  },
);

const openModal = domain.createEvent();
const closeModal = domain.createEvent();
const clearHousingStocks = domain.createEvent();
const clearTypeOfAddress = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const setTypeOfAddress = domain.createEvent<EAddressDetails>();
const $typeOfAddress = domain
  .createStore<EAddressDetails>(EAddressDetails.All)
  .on(setTypeOfAddress, (_, type) => type)
  .reset(clearTypeOfAddress);

const selectCity = domain.createEvent<string>();

const $selectedCity = domain
  .createStore<string | null>(null)
  .on(selectCity, (_, city) => city)
  .reset(closeModal);

const getExistingHousingStocksFx = domain.createEffect<
  string,
  StreetWithHousingStockNumbersResponsePagedList
>(fetchExistingHousingStocks);

const $existingHousingStocks = domain
  .createStore<StreetWithHousingStockNumbersResponse[]>([])
  .on(
    getExistingHousingStocksFx.doneData,
    (_, housingStocks) => housingStocks.items || [],
  )
  .reset(clearHousingStocks);

const getHeatingStationFx = domain.createEffect<
  void,
  HeatingStationWithStreetsResponse[]
>(fetchExistingHousingStocksWithHeatingStation);

const $housingStockWithHeatingStations = domain
  .createStore<HeatingStationWithStreetsResponse[]>([])
  .on(getHeatingStationFx.doneData, (_, housingStocks) => housingStocks)
  .reset(clearHousingStocks);

const getHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementWithStreetsResponse[]
>(fetchExistingHousingStocksWithHouseManagement);

const $housingStockWithHouseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(getHouseManagementsFx.doneData, (_, housingStocks) => housingStocks)
  .reset(clearHousingStocks);

const $isHousingStocksLoading = combine(
  getHouseManagementsFx.pending,
  getHeatingStationFx.pending,
  getExistingHousingStocksFx.pending,
  (...isLoading) => isLoading.includes(true),
);

const createResourceDisconnection =
  domain.createEvent<ResourceDisconnectingCreateRequest>();
const createResourceDisconnectionFx = domain.createEffect<
  ResourceDisconnectingCreateRequest,
  void,
  EffectFailDataAxiosError
>(fetchCreateResourceDisconnection);

forward({
  from: setTypeOfAddress,
  to: clearHousingStocks,
});

forward({
  from: editResourceDisconnectionService.inputs.openEditModal,
  to: openModal,
});

sample({
  clock: sample({
    clock: editResourceDisconnectionService.outputs.$resourceDisconnection,
    fn: (disconnection) =>
      (disconnection?.housingStocks || [])[0]?.address?.mainAddress?.city ||
      null,
  }),
  filter: Boolean,
  target: selectCity,
});

forward({
  from: createResourceDisconnection,
  to: createResourceDisconnectionFx,
});

forward({
  from: createResourceDisconnectionFx.done,
  to: closeModal,
});

forward({
  from: closeModal,
  to: [clearHousingStocks, clearTypeOfAddress],
});

sample({
  clock: $selectedCity,
  filter: Boolean,
  target: getExistingHousingStocksFx,
});

sample({
  source: sample({
    source: addressSearchService.outputs.$existingCities,
    filter: (cities): cities is string[] =>
      Boolean(cities && cities.length === 1),
  }),
  clock: [openModal],
  fn: (cities) => cities[0],
  target: selectCity,
});

split({
  source: $typeOfAddress,
  match: {
    [EAddressDetails.All]: (type) => type === EAddressDetails.All,
    [EAddressDetails.HeatingStation]: (type) =>
      type === EAddressDetails.HeatingStation,
    [EAddressDetails.HouseManagements]: (type) =>
      type === EAddressDetails.HouseManagements,
  },
  cases: {
    [EAddressDetails.All]: getExistingHousingStocksFx,
    [EAddressDetails.HeatingStation]: getHeatingStationFx,
    [EAddressDetails.HouseManagements]: getHouseManagementsFx,
  },
});

forward({
  from: createResourceDisconnectionFx.doneData,
  to: resourceDisablingScheduleServiceService.inputs
    .refetchResourceDisconnections,
});

createResourceDisconnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const createResourceDisconnectionService = {
  inputs: {
    openModal,
    closeModal,
    createResourceDisconnection,
    setTypeOfAddress,
    selectCity,
  },
  outputs: {
    $isModalOpen,
    $resourceTypes,
    $disconnectingTypes,
    $existingHousingStocks,
    $housingStockWithHeatingStations,
    $housingStockWithHouseManagements,
    $typeOfAddress,
    $isHousingStocksLoading,
    $selectedCity,
  },
};
