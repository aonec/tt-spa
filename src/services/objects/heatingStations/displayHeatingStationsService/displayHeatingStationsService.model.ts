import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { HeatingStationResponsePagedList } from 'api/types';
import { createHeatingStationService } from '../createHeatingStationService';
import { editHeatingStationService } from '../editHeatingStationService';
import { getHeatingStations } from './displayHeatingStationsService.api';

const HeatingStationsFetchGate = createGate();

const fetchHeatingStationsFx = createEffect<
  void,
  HeatingStationResponsePagedList | null
>(getHeatingStations);

const $heatingStations = createStore<HeatingStationResponsePagedList | null>(
  null,
).on(fetchHeatingStationsFx.doneData, (_, data) => data);

sample({
  clock: [
    HeatingStationsFetchGate.open,
    createHeatingStationService.inputs.handleHeatingStationCreated,
    editHeatingStationService.inputs.handleHeatingStationEdited,
  ],
  target: fetchHeatingStationsFx,
});

const $isHeatingStationsLoading = fetchHeatingStationsFx.pending;

export const displayHeatingStationsService = {
  outputs: { $heatingStations, $isHeatingStationsLoading },
  gates: { HeatingStationsFetchGate },
};
