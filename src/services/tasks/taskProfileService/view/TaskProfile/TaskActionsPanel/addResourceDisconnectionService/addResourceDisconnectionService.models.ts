import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';

export const addResourceDisconnectionService = {
  inputs: {
    openCreateDisconnectionModal:
      chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
  },
  outputs: {},
};
