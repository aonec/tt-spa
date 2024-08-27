import { createEvent, sample } from 'effector';
import { addNodeToIntegrationService } from './addNodeToIntegration/addNodeToIntegrationService.models';
import { createGate } from 'effector-react';
import { mvituIntegrationQuery } from './mvituService.api';
import { createOrUpdateIntegration } from './createMvituIntegration/createMvituIntegrationService.api';

const handleAddNodeToIntegration = createEvent();
const MvituGate = createGate();

sample({
  clock: handleAddNodeToIntegration,
  target: addNodeToIntegrationService.inputs.handleOpenModal,
});

sample({
  clock: [MvituGate.open, createOrUpdateIntegration.finished.success],
  target: mvituIntegrationQuery.start,
});

export const mvituService = {
  inputs: { handleAddNodeToIntegration },
  outputs: {},
  gates: { MvituGate },
};
