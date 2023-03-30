import { createDomain, sample } from 'effector';
import { objectProfileService } from '../objectProfileService';
import { createObjectService } from '../createObjectService';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';
import { updateHousingStock } from './editObjectService.api';
import { HousingStockResponse, HousingStockUpdateRequest } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { createGate } from 'effector-react';

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
    console.log(gateState);
    return { housingStockId: gateState.housingStockId, data: clockPayload };
  },
  target: handleUpdateHousingStockFx,
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
  },
  outputs: {
    $housingStock: objectProfileService.outputs.$housingStock,
    $houseManagements: createObjectService.outputs.$houseManagements,
    $heatingStations: createObjectService.outputs.$heatingStations,
  },
  gates: { FetchObjectGate, CatchHousingStockId },
};
