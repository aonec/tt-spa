import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { HouseManagementResponse } from 'myApi';
import { getHouseManagements } from './createObjectService.api';
import { ObjectAddressValues } from './view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.types';

const domain = createDomain('createObjectService');

const handleAddressData = domain.createEvent<ObjectAddressValues>();

const $createObjectData = domain
  .createStore<ObjectAddressValues | null>(null)
  .on(handleAddressData, (_, addresses) => addresses);

const goBackStage = domain.createEvent();

const $stageNumber = domain
  .createStore<number>(3)
  .on(handleAddressData, () => 2)
  .on(goBackStage, (prev) => prev - 1);

const fetchHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementResponse[] | null
>(getHouseManagements);

const HouseManagementsFetchGate = createGate();

forward({
  from: HouseManagementsFetchGate.open,
  to: fetchHouseManagementsFx,
});
const $houseManagements = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementsFx.doneData, (_, data) => data);


export const createObjectService = {
  inputs: { handleAddressData, goBackStage },
  outputs: { $createObjectData, $stageNumber, $houseManagements },
  gates: { HouseManagementsFetchGate },
};
