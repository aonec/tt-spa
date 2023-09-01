import { createEvent, createStore } from 'effector';
import { DistrictData } from 'types';

const openAddHouseModal = createEvent<DistrictData>();
const closeAddHouseModal = createEvent();

const $openedDistrict = createStore<DistrictData | null>(null)
  .on(openAddHouseModal, (_, district) => district)
  .reset(closeAddHouseModal);

const $isOpen = $openedDistrict.map(Boolean);

export const addHouseToDistrictService = {
  inputs: { openAddHouseModal, closeAddHouseModal },
  outputs: {
    $openedDistrict,
    $isOpen,
  },
};
