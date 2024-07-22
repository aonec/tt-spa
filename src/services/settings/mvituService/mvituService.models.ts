import { createEvent, sample } from 'effector';
import { addNodeToIntegrationService } from './addNodeToIntegration/addNodeToIntegrationService.models';

const handleAddNodeToIntegration = createEvent();

sample({
  clock: handleAddNodeToIntegration,
  target: addNodeToIntegrationService.inputs.handleOpenModal,
});

export const mvituService = {
  inputs: { handleAddNodeToIntegration },
  outputs: {},
};
