import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  NodeOnHousingStockResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import {
  getAdresses,
  getHousingStockUniqueWorkingRange,
  getNodeUniqueWorkingRange,
  getNodes,
} from './uniqueWorkingRangeService.api';
import { GetAddressesWithCityRequestPayload } from './uniqueWorkingRangeService.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const handleOnSearchDataChange = createEvent<{
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  housingStockId: number;
}>();

const handleNodeChoosen = createEvent<{
  season: ENodeWorkingRangeSeason;
  nodeId: number;
}>();

const setSelectedCity = createEvent<string>();

const handleFetchNodes = createEvent<number>();

const getHousingStockUniqueWorkingRangeFx = createEffect<
  {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    housingStockId: number;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getHousingStockUniqueWorkingRange);

const getNodeUniqueWorkingRangeFx = createEffect<
  {
    season: ENodeWorkingRangeSeason;
    nodeId: number;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getNodeUniqueWorkingRange);

const fetchAdressesFx = createEffect<
  GetAddressesWithCityRequestPayload,
  StreetWithBuildingNumbersResponsePagedList | null
>(getAdresses);

const getNodesFx = createEffect<number, NodeOnHousingStockResponse[] | null>(
  getNodes,
);

const $housingStockUniqueWorkingRange =
  createStore<AllNodeWorkingRangeResponse | null>(null).on(
    getHousingStockUniqueWorkingRangeFx.doneData,
    (_, range) => range,
  );

const $isLoading = getHousingStockUniqueWorkingRangeFx.pending;

const $selectedCity = createStore<string | null>(null).on(
  setSelectedCity,
  (_, city) => city,
);

const $addressesPagedList =
  createStore<StreetWithBuildingNumbersResponsePagedList | null>(null).on(
    fetchAdressesFx.doneData,
    (_, addresses) => addresses,
  );

const $nodes = createStore<NodeOnHousingStockResponse[] | null>(null).on(
  getNodesFx.doneData,
  (_, nodes) => nodes,
);

sample({
  clock: sample({ clock: $selectedCity, filter: Boolean }),
  fn: (selectedCity) => ({ City: selectedCity! }),
  target: fetchAdressesFx,
});

sample({
  clock: handleOnSearchDataChange,
  target: getHousingStockUniqueWorkingRangeFx,
});

sample({
  clock: handleNodeChoosen,
  target: getNodeUniqueWorkingRangeFx,
});

sample({
  clock: handleFetchNodes,
  totarget: getNodesFx,
});

export const uniqueWorkingRangeService = {
  inputs: {
    handleOnSearchDataChange,
    setSelectedCity,
    handleFetchNodes,
    handleNodeChoosen,
  },
  outputs: {
    $housingStockUniqueWorkingRange,
    $isLoading,
    $addressesPagedList,
    $existingCities: addressSearchService.outputs.$existingCities,
    $selectedCity,
    $nodes,
  },
};
