import { createDomain } from 'effector';

const domain = createDomain('checkCalculatorService');

const openModal = domain.createEvent<number>();
const closeModal = domain.createEvent();

const $isModalOpen = domain.createStore(false);

export const checkCalculatorService = {
  inputs: {},
  outputs: {},
};
