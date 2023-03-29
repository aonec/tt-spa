import { createDomain } from 'effector';
import { objectProfileService } from '../objectProfileService';

const domain = createDomain('editObjectService');

export const editObjectService = {
  inputs: {},
  outputs: { $housingStock: objectProfileService.outputs.$housingStock },
  gates: { FetchObjectGate: objectProfileService.gates.ObjectProfileIdGate },
};
