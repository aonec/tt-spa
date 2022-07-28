import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { combine, createDomain, forward } from 'effector';
import {
  HeatingStationResponse,
  ResourceDisconnectingCreateRequest,
  HeatingStationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import {
  fetchCreateResourceDisconnection,
  fetchExistingHousingStocks,
  fetchHeatingStations,
} from './createResourceDisconnectionService.api';

const domain = createDomain('createResourceDisconnectionService');

const $isModalOpen = domain.createStore(false);
const $selectedCity = domain.createStore('');
const $selectedHeatingStation = domain.createStore<string>('');
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
  void
>(fetchCreateResourceDisconnection);

$isModalOpen.on(openModal, () => true).reset(closeModal);
$selectedCity.on(selectCity, (_, city) => city);
$selectedHeatingStation.on(selectHeatingStation, (_, id) => id);
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
    $existingCities,
    $selectedCity,
    $heatingStations,
    $addressesFromHeatingStation,
    $existingHousingStocks,
  },
};
