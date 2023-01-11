import { createDomain } from 'effector';

const domain = createDomain('apartmentInfoService');

const togglePanel = domain.createEvent();

const $isPanelOpen = domain
  .createStore(false)
  .on(togglePanel, (isOpen) => !isOpen);

export const apartmentInfoService = {
  inputs: {
    togglePanel,
  },
  outputs: {
    $isPanelOpen,
  },
};
