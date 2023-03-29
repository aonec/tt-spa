import { createDomain } from 'effector';
import { objectProfileService } from '../objectProfileService';
import { createObjectService } from '../createObjectService';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';

const domain = createDomain('editObjectService');

export const editObjectService = {
  inputs: {
    openCreateHeatingStationModal:
      createHeatingStationService.inputs.handleOpenModal,
    openEditHeatingStationModal:
      editHeatingStationService.inputs.handleOpenModal,
  },
  outputs: {
    $housingStock: objectProfileService.outputs.$housingStock,
    $houseManagements: createObjectService.outputs.$houseManagements,
  },
  gates: { FetchObjectGate: objectProfileService.gates.ObjectProfileIdGate },
};
