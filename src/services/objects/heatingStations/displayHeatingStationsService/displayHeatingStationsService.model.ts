import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { HeatingStationResponsePagedList } from 'myApi';
import { getHeatingStations } from './displayHeatingStationsService.api';

const domain = createDomain('displayHeatingStationsService');

const HeatingStationsFetchGate = createGate();

const fetchHeatingStationFx = domain.createEffect<
  void,
  HeatingStationResponsePagedList | null
>(getHeatingStations);

const $heatingStations = domain
  .createStore<HeatingStationResponsePagedList | null>(null)
  .on(fetchHeatingStationFx.doneData, (_, data) => data);

forward({
  from: HeatingStationsFetchGate.open,
  to: fetchHeatingStationFx,
});

export const displayHeatingStationsService = {
  inputs: {},
  outputs: {$heatingStations},
  gates: {HeatingStationsFetchGate},
};
