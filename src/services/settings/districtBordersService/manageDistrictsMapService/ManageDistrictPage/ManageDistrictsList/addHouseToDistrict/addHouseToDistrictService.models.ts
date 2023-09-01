import { createEffect, createEvent, createStore, sample } from 'effector';
import { DistrictData } from 'types';
import { getBuilding } from './addHouseToDistrictService.api';
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

export const addHouseToDistrictService = {
  inputs: { openAddHouseModal, closeAddHouseModal, handleSearchHouse },
  outputs: {
    $openedDistrict,
    $isOpen,
    $house,
    $hasError,
  },
};
