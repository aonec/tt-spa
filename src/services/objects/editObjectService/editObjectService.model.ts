import { createDomain, sample } from 'effector';
import { objectProfileService } from '../objectProfileService';
import { createObjectService } from '../createObjectService';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';
import { updateHousingStock } from './editObjectService.api';
import { HousingStockResponse, HousingStockUpdateRequest } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { createGate } from 'effector-react';
import { displayHeatingStationsService } from '../heatingStations/displayHeatingStationsService';
import { message } from 'antd';

const domain = createDomain('editObjectService');

const FetchObjectGate = objectProfileService.gates.FetchObjectGate;
const CatchHousingStockId = createGate<{ housingStockId: number }>();

const handleUpdateHousingStock =
  domain.createEvent<HousingStockUpdateRequest>();

const onPageCancel = domain.createEvent();

const handleUpdateHousingStockFx = domain.createEffect<
  {
    housingStockId: number;
    data: HousingStockUpdateRequest;
  },
  HousingStockResponse,
  EffectFailDataAxiosError
>(updateHousingStock);

sample({
  clock: handleUpdateHousingStock,
  source: CatchHousingStockId.state,
  fn: (gateState, clockPayload) => {
    return { housingStockId: gateState.housingStockId, data: clockPayload };
  },
  target: handleUpdateHousingStockFx,
});

const successUpdate = handleUpdateHousingStockFx.doneData;

handleUpdateHousingStockFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

successUpdate.watch(() => message.success('Дом успешно обновлён'));

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
  },
  outputs: {
    $housingStock: objectProfileService.outputs.$housingStock,
    $houseManagements: createObjectService.outputs.$houseManagements,
    $isHouseManagementsLoading:
      createObjectService.outputs.$isHouseManagementsLoading,
    $heatingStations: displayHeatingStationsService.outputs.$heatingStations,
    $isHeatingStationsLoading:
      displayHeatingStationsService.outputs.$isHeatingStationsLoading,
  },
  gates: {
    FetchObjectGate,
    CatchHousingStockId,
    HouseManagementsFetchGate:
      createObjectService.gates.HouseManagementsFetchGate,
  },
};
