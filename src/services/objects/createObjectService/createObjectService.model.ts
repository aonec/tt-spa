import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { HouseManagementResponse } from 'myApi';
import { getHouseManagements } from './createObjectService.api';
import { AdditionalInfo } from './view/CreateObjectPage/CreateObjectAdditionalInfoStage/CreateObjectAdditionalInfoStage.types';
import { ObjectAddressValues } from './view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.types';
import { ObjectMainInfoValues } from './view/CreateObjectPage/CreateObjectMainInfoStage/CreateObjectMainInfoStage.types';

const domain = createDomain('createObjectService');

const handleAddressData = domain.createEvent<ObjectAddressValues>();

const handleMainInfoData = domain.createEvent<ObjectMainInfoValues>();

const handleAdditionalInfoData = domain.createEvent<AdditionalInfo>();

const goBackStage = domain.createEvent();

const handleSubmitCreateObject = domain.createEvent();

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
  .createStore<ObjectAddressValues | null>(null)
  .on(handleAddressData, (_, addresses) => addresses);

const $stageNumber = domain
  .createStore<number>(4)
  .on(handleAddressData, () => 2)
  .on(goBackStage, (prev) => prev - 1);

const $houseManagements = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementsFx.doneData, (_, data) => data);

export const createObjectService = {
  inputs: {
    handleAddressData,
    goBackStage,
    handleSubmitCreateObject,
    handleMainInfoData,
    handleAdditionalInfoData,
  },
  outputs: { $createObjectData, $stageNumber, $houseManagements },
  gates: { HouseManagementsFetchGate },
};
