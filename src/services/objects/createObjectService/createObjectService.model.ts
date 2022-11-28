import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { HouseManagementResponse } from 'myApi';
import { getHouseManagements } from './createObjectService.api';
import { ObjectCreateSubmitData } from './createObjectService.types';

const domain = createDomain('createObjectService');

const goBackStage = domain.createEvent();

const handleSubmitCreateObject = domain.createEvent<ObjectCreateSubmitData>();

const HouseManagementsFetchGate = createGate();

const fetchHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementResponse[] | null
>(getHouseManagements);

forward({
  from: HouseManagementsFetchGate.open,
  to: fetchHouseManagementsFx,
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

export const createObjectService = {
  inputs: {
    goBackStage,
    handleSubmitCreateObject,
  },
  outputs: { $createObjectData, $stageNumber, $houseManagements },
  gates: { HouseManagementsFetchGate },
};
