import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'myApi';
import {
  getHeatingStations,
  getHouseManagements,
} from './createObjectService.api';
import { ObjectCreateSubmitData } from './createObjectService.types';

const domain = createDomain('createObjectService');

const goBackStage = domain.createEvent();

const handleSubmitCreateObject = domain.createEvent<ObjectCreateSubmitData>();

const HouseManagementsFetchGate = createGate();

const HeatingStationsFetchGate = createGate();

const fetchHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementResponse[] | null
>(getHouseManagements);

const fetchHeatingStationFx = domain.createEffect<
  void,
  HeatingStationResponsePagedList | null
>(getHeatingStations);

forward({
  from: HouseManagementsFetchGate.open,
  to: fetchHouseManagementsFx,
});

forward({
  from: HeatingStationsFetchGate.open,
  to: fetchHeatingStationFx,
});

const $createObjectData = domain
  .createStore<ObjectCreateSubmitData | null>(null)
  .on(handleSubmitCreateObject, (oldData, newData) => ({
    ...oldData,
    ...newData,
  }));

const $stageNumber = domain
  .createStore<number>(1)
  .on(handleSubmitCreateObject, (prev) => prev + 1)
  .on(goBackStage, (prev) => prev - 1);

const $houseManagements = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementsFx.doneData, (_, data) => data);

const $heatingStations = domain
  .createStore<HeatingStationResponsePagedList | null>(null)
  .on(fetchHeatingStationFx.doneData, (_, data) => data);

export const createObjectService = {
  inputs: {
    goBackStage,
    handleSubmitCreateObject,
  },
  outputs: {
    $createObjectData,
    $stageNumber,
    $houseManagements,
    $heatingStations,
  },
  gates: { HouseManagementsFetchGate, HeatingStationsFetchGate },
};
