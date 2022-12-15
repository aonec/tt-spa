import { createDomain } from 'effector';

const domain = createDomain('closeCalculatorService');

const openModal = domain.createEvent<number>();
const closeModal = domain.createEvent();

const $isModalOpen = domain.createStore(false);

export const closeCalculatorService = {
  inputs: {},
  outputs: {},
};
