import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import _ from 'lodash';
import { BuildingFiltersResponse } from 'api/types';
import { getHosuingStockFilters } from './displayHosuingStockFiltersService.api';

const $hosuingStockfilters = createStore<BuildingFiltersResponse | null>(null);

const $hosuingManagementList = $hosuingStockfilters.map((filters) => {
  const houseManagements = filters?.houseManagements || [];

  const sortedHouseManagements = _.sortBy(
    houseManagements,
    (houseManagement) => houseManagement.value,
  );

  return sortedHouseManagements;
});

const fetchHosuingStockFiltersFx = createEffect<void, BuildingFiltersResponse>(
  getHosuingStockFilters,
);

const $loading = fetchHosuingStockFiltersFx.pending;

const HousingStockFiltersGate = createGate();

$hosuingStockfilters
  .on(fetchHosuingStockFiltersFx.doneData, (_, filters) => filters)
  .reset(HousingStockFiltersGate.close);

sample({
  clock: HousingStockFiltersGate.open,
  target: fetchHosuingStockFiltersFx,
});

export const displayHousingStockFiltersService = {
  inputs: {
    fetchHosuingStockFiltersFx,
    HousingStockFiltersGate,
  },
  outputs: {
    $hosuingStockfilters,
    $hosuingManagementList,
    $loading,
  },
};
