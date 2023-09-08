// import { createDomain } from 'effector';
import { createResourceDisconnectionService } from 'services/resources/createResourceDisconnectionService';

// const domain = createDomain('addResourceDisconnectionService');

export const addResourceDisconnectionService = {
  inputs: {
    openCreateDisconnectionModal:
      createResourceDisconnectionService.inputs.openModal,
  },
  outputs: {},
};
