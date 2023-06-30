import { createDomain, merge, sample } from 'effector';
import { objectProfileService } from '../objectProfileService';
import { createObjectService } from '../createObjectService';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';
import {
  createHousingStockAddress,
  deleteHousingStockAddress,
  updateHousingStock,
  updateHousingStockAddress,
} from './editObjectService.api';
import {
  BuildingAddressCreateRequest,
  BuildingAddressUpdateRequest,
  HousingStockResponse,
  HousingStockUpdateRequest,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { createGate } from 'effector-react';
import { displayHeatingStationsService } from '../heatingStations/displayHeatingStationsService';
import { message } from 'antd';

const domain = createDomain('editObjectService');

const FetchObjectGate = objectProfileService.gates.FetchObjectGate;
const CatchHousingStockId = createGate<{ buildingId: number }>();

const handleUpdateHousingStock =
  domain.createEvent<HousingStockUpdateRequest>();

const handleCreateHousingStockAddress =
  domain.createEvent<BuildingAddressCreateRequest>();

const handleUpdateHousingStockAddress = domain.createEvent<{
  addressId: number;
  data: BuildingAddressUpdateRequest;
}>();

const handleDeleteHousingStockAddress = domain.createEvent<{
  addressId: number;
}>();

const onPageCancel = domain.createEvent();

const handleRefetchHousingStock = domain.createEvent();

const updateHousingStockFx = domain.createEffect<
  {
    housingStockId: number;
    data: HousingStockUpdateRequest;
  },
  HousingStockResponse,
  EffectFailDataAxiosError
>(updateHousingStock);

const createHousingStockAddressFx = domain.createEffect<
  {
    housingStockId: number;
    data: BuildingAddressCreateRequest;
  },
  HousingStockResponse,
  EffectFailDataAxiosError
>(createHousingStockAddress);

const updateHousingStockAddressFx = domain.createEffect<
  {
    housingStockId: number;
    addressId: number;
    data: BuildingAddressUpdateRequest;
  },
  HousingStockResponse,
  EffectFailDataAxiosError
>(updateHousingStockAddress);

const deleteHousingStockAddressFx = domain.createEffect<
  {
    housingStockId: number;
    addressId: number;
  },
  HousingStockResponse,
  EffectFailDataAxiosError
>(deleteHousingStockAddress);

sample({
  clock: handleUpdateHousingStock,
  source: CatchHousingStockId.state,
  fn: (gateState, clockPayload) => {
    return { housingStockId: gateState.buildingId, data: clockPayload };
  },
  target: updateHousingStockFx,
});

sample({
  clock: handleCreateHousingStockAddress,
  source: CatchHousingStockId.state,
  fn: (gateState, clockPayload) => {
    return { housingStockId: gateState.buildingId, data: clockPayload };
  },
  target: createHousingStockAddressFx,
});

sample({
  clock: handleUpdateHousingStockAddress,
  source: CatchHousingStockId.state,
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
  source: CatchHousingStockId.state,
  fn: (gateState, clockPayload) => {
    return {
      housingStockId: gateState.buildingId,
      addressId: clockPayload.addressId,
    };
  },
  target: deleteHousingStockAddressFx,
});

const successUpdate = updateHousingStockFx.doneData;

updateHousingStockFx.failData.watch((error) => {
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

const $housingStock = objectProfileService.outputs.$housingStock.on(
  successDeleteAddress,
  (_, housingStock) => housingStock,
);

sample({
  clock: handleRefetchHousingStock,
  source: CatchHousingStockId.state,
  fn: (gateState) => {
    return gateState.buildingId;
  },
  target: objectProfileService.inputs.handleFetchHousingStock,
});

const handleMessage = merge([successCreateAddress, successUpdateAddress]);

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
    handleRefetchHousingStock,
  },
  outputs: {
    $housingStock,
    $houseManagements: createObjectService.outputs.$houseManagements,
    $isHouseManagementsLoading:
      createObjectService.outputs.$isHouseManagementsLoading,
    $heatingStations: displayHeatingStationsService.outputs.$heatingStations,
    $isHeatingStationsLoading:
      displayHeatingStationsService.outputs.$isHeatingStationsLoading,
    $isDeleteLoading,
    $isUpdateLoading,
    $isCreateLoading,
  },
  gates: {
    FetchObjectGate,
    CatchHousingStockId,
    HouseManagementsFetchGate:
      createObjectService.gates.HouseManagementsFetchGate,
  },
};
