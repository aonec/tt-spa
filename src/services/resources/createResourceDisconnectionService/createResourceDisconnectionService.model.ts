import { message } from 'antd';
import { combine, createDomain, forward } from 'effector';
import _ from 'lodash/fp';
import {
  HeatingStationResponse,
  ResourceDisconnectingCreateRequest,
  HeatingStationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { resourceDisconnectionFiltersService } from '../resourceDisconnectionFiltersService';
import {
  fetchCreateResourceDisconnection,
  fetchExistingHousingStocks,
  fetchHeatingStations,
} from './createResourceDisconnectionService.api';

const domain = createDomain('createResourceDisconnectionService');

const $isModalOpen = domain.createStore(false);

const $selectedCity = domain.createStore('');
const $selectedHeatingStation = domain.createStore('');

const $cities = resourceDisconnectionFiltersService.outputs.$resourceDisconnectionFilters.map(
  (store) => store?.cities || []
);
const $resourceTypes = resourceDisconnectionFiltersService.outputs.$resourceDisconnectionFilters.map(
  (store) => store?.resourceTypes || []
);
const $disconnectingTypes = resourceDisconnectionFiltersService.outputs.$resourceDisconnectionFilters.map(
  (store) => store?.disconnectingTypes || []
);

const $heatingStations = domain.createStore<HeatingStationResponse[]>([]);

const $existingHousingStocks = domain.createStore<
  StreetWithHousingStockNumbersResponse[]
>([]);

const $addressesFromHeatingStation = combine(
  $heatingStations,
  $selectedHeatingStation,
  (stations, selectedStation) =>
    stations.find((station) => station.id === selectedStation)?.housingStocks ||
    []
);

const openModal = domain.createEvent();
const closeModal = domain.createEvent();
const clearStore = domain.createEvent();

const selectCity = domain.createEvent<string>();
const selectHeatingStation = domain.createEvent<string>();

const getHeatingStationFx = domain.createEffect<
  string,
  HeatingStationResponsePagedList
>(fetchHeatingStations);
const getExistingHosuingStocksFx = domain.createEffect<
  string,
  StreetWithHousingStockNumbersResponsePagedList
>(fetchExistingHousingStocks);

const createResourceDisconnection = domain.createEvent<ResourceDisconnectingCreateRequest>();
const createResourceDisconnectionFx = domain.createEffect<
  ResourceDisconnectingCreateRequest,
  void,
  EffectFailDataAxiosError
>(fetchCreateResourceDisconnection);

$isModalOpen.on(openModal, () => true).reset(closeModal);
$selectedCity.on(selectCity, (_, city) => city);
$selectedHeatingStation
  .on(selectHeatingStation, (_, id) => id)
  .reset(clearStore);
$heatingStations.on(
  getHeatingStationFx.doneData,
  (_, stations) => stations.items || []
);
$existingHousingStocks.on(
  getExistingHosuingStocksFx.doneData,
  (_, housingStocks) => housingStocks.items || []
);

forward({
  from: $selectedCity,
  to: getExistingHosuingStocksFx,
});

forward({
  from: $selectedCity,
  to: getHeatingStationFx,
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
  to: clearStore,
});

createResourceDisconnectionFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

export const createResourceDisconnectionService = {
  inputs: {
    openModal,
    closeModal,
    createResourceDisconnection,
    selectCity,
    selectHeatingStation,
  },
  outputs: {
    $isModalOpen,
    $selectedCity,
    $heatingStations,
    $addressesFromHeatingStation,
    $existingHousingStocks,
    $cities,
    $resourceTypes,
    $disconnectingTypes,
  },
};
