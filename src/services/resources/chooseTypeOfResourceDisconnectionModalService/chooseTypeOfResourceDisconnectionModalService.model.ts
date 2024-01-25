import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { BuildingListResponse, EResourceDisconnectingType } from 'api/types';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';

const openModal = createEvent<BuildingListResponse | void>();
const closeModal = createEvent();
const submitModal = createEvent();

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const setInterHeatingSeason = createEvent();
const clearInterHeatingSeason = createEvent();
const $isInterHeatingSeason = createStore(false)
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

sample({
  clock: submitModal,
  target: closeModal,
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
