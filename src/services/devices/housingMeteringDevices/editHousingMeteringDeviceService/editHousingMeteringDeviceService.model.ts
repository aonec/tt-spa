import { createDomain } from 'effector';

const domain = createDomain('editHousingMeteringDeviceService');

const $isModalOpen = domain.createStore<boolean>(false);

export const editHousingMeteringDeviceService = {
  inputs: {},
  outputs: {},
};
