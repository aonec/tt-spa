import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  AddHeatingStationRequest,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'myApi';
import {
  getHeatingStations,
  getHouseManagements,
  postHeatingStation,
} from './createObjectService.api';
import { ObjectCreateSubmitData } from './createObjectService.types';

const domain = createDomain('createObjectService');

const goBackStage = domain.createEvent();

const handleSubmitCreateObject = domain.createEvent<ObjectCreateSubmitData>();

const handleCreateHeatingStation = domain.createEvent<AddHeatingStationRequest>();

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

const createHeatingStationFx = domain.createEffect<
  AddHeatingStationRequest,
  HeatingStationResponse | null
>(postHeatingStation);

forward({
  from: HouseManagementsFetchGate.open,
  to: fetchHouseManagementsFx,
});

forward({
  from: HeatingStationsFetchGate.open,
  to: fetchHeatingStationFx,
});

forward({
  from: handleCreateHeatingStation,
  to: createHeatingStationFx,
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

const $newNeatingStation = domain
  .createStore<HeatingStationResponse | null>(null)
  .on(createHeatingStationFx.doneData, (_, data) => data);

export const createObjectService = {
  inputs: {
    goBackStage,
    handleSubmitCreateObject,
    handleCreateHeatingStation,
  },
  outputs: {
    $createObjectData,
    $stageNumber,
    $houseManagements,
    $heatingStations,
  },
  gates: { HouseManagementsFetchGate, HeatingStationsFetchGate },
};
