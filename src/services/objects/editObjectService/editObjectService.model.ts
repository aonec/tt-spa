import { objectProfileService } from '../objectProfileService';

export const editObjectService = {
  inputs: {},
  outputs: { $housingStock: objectProfileService.outputs.$housingStock },
  gates: { FetchObjectGate: objectProfileService.gates.ObjectProfileIdGate },
};
