import { createEvent, createStore } from 'effector';
import {
  deleteDistrictMutation,
  updateDistrictMutation,
} from '../../manageDistrictsMapService.api';

const selectDistrict = createEvent<string | null>();

const openDeleteDistrictModal = createEvent();
const closeDeleteDistrictModal = createEvent();

const openEditDistrictModal = createEvent();
const closeEditDistrictModal = createEvent();

const $selectedDistrict = createStore<string | null>(null)
  .on(selectDistrict, (_, id) => id)
  .reset(
    deleteDistrictMutation.finished.success,
    updateDistrictMutation.finished.success,
  );

const $isDeleteDistrictModalOpen = createStore(false)
  .on(openDeleteDistrictModal, () => true)
  .reset(closeDeleteDistrictModal, deleteDistrictMutation.finished.success);

const $isEditDistictInfoModalOpen = createStore(false)
  .on(openEditDistrictModal, () => true)
  .reset(closeEditDistrictModal, updateDistrictMutation.finished.success);

export const manageDistrictMapService = {
  inputs: {
    selectDistrict,
    openDeleteDistrictModal,
    closeDeleteDistrictModal,
    openEditDistrictModal,
    closeEditDistrictModal,
  },
  outputs: {
    $selectedDistrict,
    $isDeleteDistrictModalOpen,
    $isEditDistictInfoModalOpen,
  },
};
