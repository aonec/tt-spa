import { createDomain } from 'effector';

const inspectorReassignmentServiceDomain = createDomain(
  'inspectorrRassignmentService'
);

const $isModalOpen = inspectorReassignmentServiceDomain.createStore(false);

const openModal = inspectorReassignmentServiceDomain.createEvent();
const closeModal = inspectorReassignmentServiceDomain.createEvent();

export const inspectorReassignmentService = {
  outputs: {
    $isModalOpen,
  },
  inputs: {
    openModal,
    closeModal,
  },
};
