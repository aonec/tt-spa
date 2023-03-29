import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { objectProfileService } from '../objectProfileService';

const domain = createDomain('editObjectService');
const FetchObjectGate = createGate<{ objectId: string }>();

// sample({
//   clock: FetchObjectGate.open,
//   source: FetchObjectGate.state,
//   fn: (gateState) => gateState.objectId,
//   target: 
// });

export const editObjectService = {
  inputs: {},
  outputs: { $housingStock: objectProfileService.outputs.$housingStock },
  gates: { FetchObjectGate: objectProfileService.gates.ObjectProfileIdGate },
};
