import { createEffect, createEvent, createStore } from 'effector';
import { merge, sample, split } from 'effector';
import { createObjectService } from '../createObjectService';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';
import {
  createHousingStockAddress,
  deleteHousingStockAddress,
  getHousingStock,
  getNonResidentialBuilding,
  updateHousingStock,
  updateHousingStockAddress,
} from './editObjectService.api';
import {
  BuildingAddressCreateRequest,
  BuildingAddressUpdateRequest,
  EHouseCategory,
  HousingStockResponse,
  HousingStockUpdateRequest,
  NonResidentialBuildingResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { createGate } from 'effector-react';
import { displayHeatingStationsService } from '../heatingStations/displayHeatingStationsService';
import { message } from 'antd';
import { GetBuildingPayload } from 'services/nodes/createNodeService/createNodeService.types';
import { EditObjectPayload } from './editObjectService.types';

const ObjectIdGate = createGate<{
  buildingId: number;
  houseCategory: EHouseCategory | null;
}>();

const handleUpdateHousingStock = createEvent<HousingStockUpdateRequest>();

const handleCreateHousingStockAddress =
  createEvent<BuildingAddressCreateRequest>();

const handleUpdateHousingStockAddress = createEvent<{
  addressId: number;
  data: BuildingAddressUpdateRequest;
}>();

const handleDeleteHousingStockAddress = createEvent<{
  addressId: number;
}>();

const onPageCancel = createEvent();

const handleRefetchBuilding = createEvent();

const updateBuildingFx = createEffect<
  EditObjectPayload,
  void,
  EffectFailDataAxiosError
>(updateHousingStock);

const createHousingStockAddressFx = createEffect<
  {
    housingStockId: number;
    data: BuildingAddressCreateRequest;
  },
  void,
  EffectFailDataAxiosError
>(createHousingStockAddress);

const updateHousingStockAddressFx = createEffect<
  {
    housingStockId: number;
    addressId: number;
    data: BuildingAddressUpdateRequest;
  },
  void,
  EffectFailDataAxiosError
>(updateHousingStockAddress);

const deleteHousingStockAddressFx = createEffect<
  {
    housingStockId: number;
    addressId: number;
  },
  void,
  EffectFailDataAxiosError
>(deleteHousingStockAddress);

sample({
  clock: sample({
    clock: handleUpdateHousingStock,
    source: ObjectIdGate.state,
    fn: (gateState, clockPayload) => {
      return { ...gateState, data: clockPayload };
    },
  }),
  filter: (state): state is EditObjectPayload => Boolean(state.houseCategory),
  target: updateBuildingFx,
});

sample({
  clock: handleCreateHousingStockAddress,
  source: ObjectIdGate.state,
  fn: (gateState, clockPayload) => {
    return { housingStockId: gateState.buildingId, data: clockPayload };
  },
  target: createHousingStockAddressFx,
});

sample({
  clock: handleUpdateHousingStockAddress,
  source: ObjectIdGate.state,
  fn: (gateState, clockPayload) => {
    return {
      housingStockId: gateState.buildingId,
      addressId: clockPayload.addressId,
      data: clockPayload.data,
    };
  },
  target: updateHousingStockAddressFx,
});

sample({
  clock: handleDeleteHousingStockAddress,
  source: ObjectIdGate.state,
  fn: (gateState, clockPayload) => {
    return {
      housingStockId: gateState.buildingId,
      addressId: clockPayload.addressId,
    };
  },
  target: deleteHousingStockAddressFx,
});

const successUpdate = updateBuildingFx.doneData;

updateBuildingFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

successUpdate.watch(() => message.success('Дом успешно обновлён'));

const $isDeleteLoading = deleteHousingStockAddressFx.pending;
const $isUpdateLoading = updateHousingStockAddressFx.pending;
const $isCreateLoading = createHousingStockAddressFx.pending;

const successDeleteAddress = deleteHousingStockAddressFx.doneData;
const successUpdateAddress = updateHousingStockAddressFx.doneData;
const successCreateAddress = createHousingStockAddressFx.doneData;

const fetchBuilding = createEvent<GetBuildingPayload>();
const fetchHousingStockFx = createEffect<
  { buildingId: number },
  HousingStockResponse
>(getHousingStock);
const $housingStock = createStore<HousingStockResponse | null>(null)
  .on(fetchHousingStockFx.doneData, (_, building) => building)
  .reset(ObjectIdGate.close);

const fetchNonResidentialBuildingFx = createEffect<
  { buildingId: number },
  NonResidentialBuildingResponse
>(getNonResidentialBuilding);
const $nonResidentialBuilding =
  createStore<NonResidentialBuildingResponse | null>(null)
    .on(fetchNonResidentialBuildingFx.doneData, (_, building) => building)
    .reset(ObjectIdGate.close);

sample({
  clock: [handleRefetchBuilding, ObjectIdGate.state],
  source: ObjectIdGate.state,
  filter: (state): state is GetBuildingPayload => Boolean(state.houseCategory),
  target: fetchBuilding,
});

split({
  source: fetchBuilding,
  match: (clock: GetBuildingPayload): EHouseCategory => clock.houseCategory,
  cases: {
    [EHouseCategory.Living]: fetchHousingStockFx,
    [EHouseCategory.NonResidential]: fetchNonResidentialBuildingFx,
  },
});

const handleMessage = merge([
  successCreateAddress,
  successUpdateAddress,
  successDeleteAddress,
]);

sample({
  clock: handleMessage,
  target: handleRefetchBuilding,
});

handleMessage.watch(() => {
  message.destroy();
  message.success('Адрес обновлён');
});

deleteHousingStockAddressFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});
updateHousingStockAddressFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});
createHousingStockAddressFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const editObjectService = {
  inputs: {
    openCreateHeatingStationModal:
      createHeatingStationService.inputs.handleOpenModal,
    openEditHeatingStationModal:
      editHeatingStationService.inputs.handleOpenModal,
    heatingStationCapture: createObjectService.inputs.heatingStationCapture,
    onPageCancel,
    handleUpdateHousingStock,
    successUpdate,
    handleCreateHousingStockAddress,
    handleUpdateHousingStockAddress,
    handleDeleteHousingStockAddress,
    handleRefetchBuilding,
  },
  outputs: {
    $housingStock,
    $nonResidentialBuilding,

    $heatingStations: displayHeatingStationsService.outputs.$heatingStations,
    $isHeatingStationsLoading:
      displayHeatingStationsService.outputs.$isHeatingStationsLoading,
    $isDeleteLoading,
    $isUpdateLoading,
    $isCreateLoading,
  },
  gates: {
    ObjectIdGate,
  },
};
