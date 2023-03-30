import { createDomain } from 'effector';
import { objectProfileService } from '../objectProfileService';
import { createObjectService } from '../createObjectService';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';

const domain = createDomain('editObjectService');

const onPageCancel = domain.createEvent();

export const editObjectService = {
  inputs: {
    openCreateHeatingStationModal:
      createHeatingStationService.inputs.handleOpenModal,
    openEditHeatingStationModal:
      editHeatingStationService.inputs.handleOpenModal,
    heatingStationCapture: createObjectService.inputs.heatingStationCapture,
    onPageCancel,
  },
  outputs: {
    $housingStock: objectProfileService.outputs.$housingStock,
    $houseManagements: createObjectService.outputs.$houseManagements,
    $heatingStations: createObjectService.outputs.$heatingStations,
  },
  gates: { FetchObjectGate: objectProfileService.gates.ObjectProfileIdGate },
};
