import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import _ from 'lodash';
import { GuidStringDictionaryItem, HousingStockFilterResponse } from 'myApi';
import { getHosuingStockFilters } from './displayHosuingStockFiltersService.api';

const displayHosuingStockFiltersServiceDomain = createDomain(
  'displayHosuingStockFiltersServiceDomain'
);

const $hosuingStockfilters = displayHosuingStockFiltersServiceDomain.createStore<HousingStockFilterResponse | null>(
  null
);

const $hosuingManagementList = $hosuingStockfilters.map((filters) => {
  const houseManagements = filters?.houseManagements || [];

  const sortedHouseManagements = _.sortBy(
    houseManagements,
    (houseManagement) => houseManagement.value
  );

  return sortedHouseManagements;
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
