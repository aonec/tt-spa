import { createDomain, forward } from 'effector';
import { EResourceDisconnectingType } from 'api/myApi';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';

const domain = createDomain('chooseTypeOfResourceDisconnectionModalService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();
const submitModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const setInterHeatingSeason = domain.createEvent();
const clearInterHeatingSeason = domain.createEvent();
const $isInterHeatingSeason = domain
  .createStore(false)
  .on(
    editResourceDisconnectionService.outputs.$resourceDisconnection,
    (_, disconnection) => {
      if (!disconnection) {
        return false;
      }
      const isInterHeatingSeason =
        disconnection.disconnectingType?.value ===
        EResourceDisconnectingType.InterHeatingSeason;
      return isInterHeatingSeason;
    },
  )
  .on(setInterHeatingSeason, () => true)
  .reset(clearInterHeatingSeason);

forward({
  from: submitModal,
  to: closeModal,
});

export const chooseTypeOfResourceDisconnectionModalService = {
  inputs: {
    setInterHeatingSeason,
    clearInterHeatingSeason,
    openModal,
    closeModal,
    submitModal,
  },
  outputs: {
    $isModalOpen,
    $isInterHeatingSeason,
  },
};
