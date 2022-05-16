import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { HousingStockFilterResponse } from 'myApi';
import { getHosuingStockFilters } from './displayHosuingStockFiltersService.api';
import { sortHousingManagementsListByAlphabet } from './utils';

const displayHosuingStockFiltersServiceDomain = createDomain(
  'displayHosuingStockFiltersServiceDomain'
);

const $hosuingStockfilters = displayHosuingStockFiltersServiceDomain.createStore<HousingStockFilterResponse | null>(
  null
);

const $hosuingManagementList = $hosuingStockfilters.map((filters) => {
  const houseManagements = filters?.houseManagements || [];
  return sortHousingManagementsListByAlphabet(houseManagements);
});

const fetchHosuingStockFiltersFx = displayHosuingStockFiltersServiceDomain.createEffect<
  void,
  HousingStockFilterResponse
>(getHosuingStockFilters);

const $loading = fetchHosuingStockFiltersFx.pending;

const HousingStockFiltersGate = createGate();

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
