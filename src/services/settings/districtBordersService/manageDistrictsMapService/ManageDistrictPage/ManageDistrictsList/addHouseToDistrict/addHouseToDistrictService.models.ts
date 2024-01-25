import { createEffect, createEvent, createStore, sample } from 'effector';
import { message } from 'antd';
import { DistrictData } from 'types';
import {
  addHouseToDistrictMutation,
  getBuilding,
} from './addHouseToDistrictService.api';
import { GetBuildingFilters } from './addHouseToDistrictService.types';
import { HousingStockResponse } from 'api/types';

const openAddHouseModal = createEvent<DistrictData>();
const closeAddHouseModal = createEvent();

const handleSearchHouse = createEvent<GetBuildingFilters>();

const fetchHouseByAddressFx = createEffect<
  GetBuildingFilters,
  HousingStockResponse | null
>(getBuilding);

sample({ clock: handleSearchHouse, target: fetchHouseByAddressFx });

const $house = createStore<HousingStockResponse | null>(null)
  .on(fetchHouseByAddressFx.doneData, (_, data) => data)
  .reset(closeAddHouseModal);

const $hasError = createStore(false)
  .on(fetchHouseByAddressFx.doneData, (_, data) => !data)
  .reset(closeAddHouseModal);

const $openedDistrict = createStore<DistrictData | null>(null)
  .on(openAddHouseModal, (_, district) => district)
  .reset(closeAddHouseModal);

const $isOpen = $openedDistrict.map(Boolean);

sample({
  clock: addHouseToDistrictMutation.finished.success,
  target: closeAddHouseModal,
});

addHouseToDistrictMutation.finished.success.watch(() =>
  message.success('Дом успешно добавлен в район!'),
);

addHouseToDistrictMutation.finished.failure.watch((e) => {
  message.error(
    e.error.response.data.error.Text ||
      e.error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const addHouseToDistrictService = {
  inputs: { openAddHouseModal, closeAddHouseModal, handleSearchHouse },
  outputs: {
    $openedDistrict,
    $isOpen,
    $house,
    $hasError,
  },
};
