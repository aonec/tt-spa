import { BuildingListResponse, EHouseCategory } from 'api/types';
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  merge,
  sample,
  split,
} from 'effector';
import {
  removeLivingBuilding,
  removeNonResidentialBuilding,
} from './deleteObjectService.api';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd/lib';

const closeModal = createEvent();
const openModal = createEvent<BuildingListResponse>();
const $building = createStore<BuildingListResponse | null>(null)
  .on(openModal, (_, building) => building)
  .reset(closeModal);

const $isOpen = $building.map(Boolean);

const deleteBuilding = createEvent();

const deleteLivingBuilding = createEvent();
const deleteLivingBuildingFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(removeLivingBuilding);

const deleteNonResidentialBuilding = createEvent();
const deleteNonResidentialBuildingFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(removeNonResidentialBuilding);

const buildingDeleted = merge([
  deleteNonResidentialBuildingFx.doneData,
  deleteLivingBuildingFx.doneData,
]);

const buildingDeletionFailed = merge([
  deleteNonResidentialBuildingFx.failData,
  deleteLivingBuildingFx.failData,
]);

const $isLoading = combine(
  deleteLivingBuildingFx.pending,
  deleteNonResidentialBuildingFx.pending,
  (...isLoading) => isLoading.some((isLoading) => isLoading),
);

const $houseCategory = $building.map(
  (building) => building?.houseCategory || EHouseCategory.Living,
);

split({
  source: $houseCategory,
  clock: deleteBuilding,
  match: (type) => type,
  cases: {
    [EHouseCategory.Living]: deleteLivingBuilding,
    [EHouseCategory.NonResidential]: deleteNonResidentialBuilding,
  },
});

sample({
  source: $building,
  filter: Boolean,
  clock: deleteLivingBuilding,
  fn: (building) => building.id,
  target: deleteLivingBuildingFx,
});

sample({
  source: $building,
  filter: Boolean,
  clock: deleteNonResidentialBuilding,
  fn: (building) => building.id,
  target: deleteNonResidentialBuildingFx,
});

sample({
  clock: buildingDeleted,
  target: closeModal,
});

buildingDeleted.watch(() => message.success('Дом успешно удалён!'));

buildingDeletionFailed.watch((e) => message.error(e.response.data.error.Text));

export const deleteObjectService = {
  inputs: {
    openModal,
    closeModal,
    deleteBuilding,
    buildingDeleted,
  },
  outputs: {
    $isOpen,
    $building,
    $isLoading,
  },
};
