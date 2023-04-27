import { createDomain } from 'effector';

const domain = createDomain('selectPersonalNumberActionService');

const setSelectActionModalOpen = domain.createEvent<boolean>();

const isSelectActionModalOpen = domain
  .createStore<boolean>(false)
  .on(setSelectActionModalOpen, (_, isOpen) => isOpen);

export const selectPersonalNumberActionService = {
  inputs: {setSelectActionModalOpen},
  outputs: {isSelectActionModalOpen},
};
