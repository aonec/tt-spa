import { createEvent, createStore } from 'effector';
import { deleteDistrictMutation } from '../../manageDistrictsMapService.api';

const selectDistrict = createEvent<string | null>();

const openDeleteDistrictModal = createEvent();
const closeDeleteDistrictModal = createEvent();

const $selectedDistrict = createStore<string | null>(null)
  .on(selectDistrict, (_, id) => id)
  .reset(deleteDistrictMutation.finished.success);

const $isDeleteDistrictModalOpen = createStore(false)
  .on(openDeleteDistrictModal, () => true)
  .reset(closeDeleteDistrictModal, deleteDistrictMutation.finished.success);

export const manageDistrictMapService = {
  inputs: {
    selectDistrict,
    openDeleteDistrictModal,
    closeDeleteDistrictModal,
  },
  outputs: {
    $selectedDistrict,
    $isDeleteDistrictModalOpen,
  },
};
