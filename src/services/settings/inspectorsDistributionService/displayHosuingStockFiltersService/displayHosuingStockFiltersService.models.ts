import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import _ from 'lodash';
import { BuildingFiltersResponse } from 'api/types';
import { getHosuingStockFilters } from './displayHosuingStockFiltersService.api';

const displayHosuingStockFiltersServiceDomain = createDomain(
  'displayHosuingStockFiltersServiceDomain',
);

const $hosuingStockfilters =
  displayHosuingStockFiltersServiceDomain.createStore<BuildingFiltersResponse | null>(
    null,
  );

const $hosuingManagementList = $hosuingStockfilters.map((filters) => {
  const houseManagements = filters?.houseManagements || [];

  const sortedHouseManagements = _.sortBy(
    houseManagements,
    (houseManagement) => houseManagement.value,
  );

  return sortedHouseManagements;
});

const fetchHosuingStockFiltersFx =
  displayHosuingStockFiltersServiceDomain.createEffect<
    void,
    BuildingFiltersResponse
  >(getHosuingStockFilters);

const $loading = fetchHosuingStockFiltersFx.pending;

const HousingStockFiltersGate = createGate();

$hosuingStockfilters
  .on(fetchHosuingStockFiltersFx.doneData, (_, filters) => filters)
  .reset(HousingStockFiltersGate.close);

forward({
  from: HousingStockFiltersGate.open,
  to: fetchHosuingStockFiltersFx,
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
