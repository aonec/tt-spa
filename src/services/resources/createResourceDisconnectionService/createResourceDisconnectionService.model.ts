import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { combine, createDomain, forward } from 'effector';
import {
  HeatingStationResponse,
  ResourceDisconnectingCreateRequest,
  HeatingStationResponsePagedList,
} from 'myApi';
import {
  fetchCreateResourceDisconnection,
  fetchHeatingStations,
} from './createResourceDisconnectionService.api';

const domain = createDomain('createResourceDisconnectionService');

const $isModalOpen = domain.createStore(false);
const $selectedCity = domain.createStore('');
const $selectedHeatingStation = domain.createStore<string>('');
const $heatingStations = domain.createStore<HeatingStationResponse[]>([]);
const $addresses = combine(
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
    $addresses,
  },
};
