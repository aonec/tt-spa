import { objectProfileService } from '../objectProfileService';
import { createObjectService } from '../createObjectService';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';

export const editObjectService = {
  inputs: {
    openCreateHeatingStationModal:
      createHeatingStationService.inputs.handleOpenModal,
    openEditHeatingStationModal:
      editHeatingStationService.inputs.handleOpenModal,
    heatingStationCapture: createObjectService.inputs.heatingStationCapture,
  },
  outputs: {
    $housingStock: objectProfileService.outputs.$housingStock,
    $houseManagements: createObjectService.outputs.$houseManagements,
    $heatingStations: createObjectService.outputs.$heatingStations,
  },
  gates: { FetchObjectGate: objectProfileService.gates.ObjectProfileIdGate },
};
