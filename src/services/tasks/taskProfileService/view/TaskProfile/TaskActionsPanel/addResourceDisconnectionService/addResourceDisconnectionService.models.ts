// import { createDomain } from 'effector';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';

// const domain = createDomain('addResourceDisconnectionService');

export const addResourceDisconnectionService = {
  inputs: {
    openCreateDisconnectionModal:
      chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
  },
  outputs: {},
};
