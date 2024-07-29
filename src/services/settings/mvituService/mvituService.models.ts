import { createEvent, sample } from 'effector';
import { addNodeToIntegrationService } from './addNodeToIntegration/addNodeToIntegrationService.models';
import { createGate } from 'effector-react';
// import { mvituIntegrationQuery } from './mvituService.api';

const handleAddNodeToIntegration = createEvent();
const MvituGate = createGate();

sample({
  clock: handleAddNodeToIntegration,
  target: addNodeToIntegrationService.inputs.handleOpenModal,
});

// tofix
// sample({ clock: MvituGate.open, target: mvituIntegrationQuery.start });

export const mvituService = {
  inputs: { handleAddNodeToIntegration },
  outputs: {},
  gates: { MvituGate },
};
