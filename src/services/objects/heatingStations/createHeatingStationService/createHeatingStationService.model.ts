import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  AddHeatingStationRequest,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
} from 'myApi';
import {
  getHeatingStations,
  postHeatingStation,
} from './createHeatingStationService.api';

const domain = createDomain('createHeatingStationService');

const handleCreateHeatingStation = domain.createEvent<AddHeatingStationRequest>();

const setModalOpen = domain.createEvent<boolean>();

const HeatingStationsFetchGate = createGate();

const fetchHeatingStationFx = domain.createEffect<
  void,
  HeatingStationResponsePagedList | null
>(getHeatingStations);

const createHeatingStationFx = domain.createEffect<
  AddHeatingStationRequest,
  HeatingStationResponse | null
>(postHeatingStation);

forward({
  from: HeatingStationsFetchGate.open,
  to: fetchHeatingStationFx,
});

forward({
  from: handleCreateHeatingStation,
  to: createHeatingStationFx,
});

const $heatingStations = domain
  .createStore<HeatingStationResponsePagedList | null>(null)
  .on(fetchHeatingStationFx.doneData, (_, data) => data);

const $newHeatingStation = domain
  .createStore<HeatingStationResponse | null>(null)
  .on(createHeatingStationFx.doneData, (_, data) => data);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(setModalOpen, (_, data) => data);

export const createHeatingStationService = {
  inputs: { handleCreateHeatingStation, setModalOpen },
  outputs: { $heatingStations, $isModalOpen },
  gates: { HeatingStationsFetchGate },
};
