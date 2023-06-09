import { createDomain, forward, sample } from 'effector';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  NodeOnHousingStockResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import {
  getAdresses,
  getHousingStockUniqueWorkingRange,
  getNodeUniqueWorkingRange,
  getNodes,
} from './uniqueWorkingRangeService.api';
import { GetAddressesWithCityRequestPayload } from './uniqueWorkingRangeService.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const domain = createDomain('uniqueWorkingRangeService');

const handleOnSearchDataChange = domain.createEvent<{
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  housingStockId: number;
}>();

const handleNodeChoosen = domain.createEvent<{
  season: ENodeWorkingRangeSeason;
  nodeId: number;
}>();

const setSelectedCity = domain.createEvent<string>();

const handleFetchNodes = domain.createEvent<number>();

const getHousingStockUniqueWorkingRangeFx = domain.createEffect<
  {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    housingStockId: number;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getHousingStockUniqueWorkingRange);

const getNodeUniqueWorkingRangeFx = domain.createEffect<
  {
    season: ENodeWorkingRangeSeason;
    nodeId: number;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getNodeUniqueWorkingRange);

const fetchAdressesFx = domain.createEffect<
  GetAddressesWithCityRequestPayload,
  StreetWithHousingStockNumbersResponsePagedList | null
>(getAdresses);

const getNodesFx = domain.createEffect<
  number,
  NodeOnHousingStockResponse[] | null
>(getNodes);

const $housingStockUniqueWorkingRange = domain
  .createStore<AllNodeWorkingRangeResponse | null>(null)
  .on(getHousingStockUniqueWorkingRangeFx.doneData, (_, range) => range);

const $isLoading = getHousingStockUniqueWorkingRangeFx.pending;

const $selectedCity = domain
  .createStore<string | null>(null)
  .on(setSelectedCity, (_, city) => city);

const $addressesPagedList = domain
  .createStore<StreetWithHousingStockNumbersResponsePagedList | null>(null)
  .on(fetchAdressesFx.doneData, (_, addresses) => addresses);

const $nodes = domain
  .createStore<NodeOnHousingStockResponse[] | null>(null)
  .on(getNodesFx.doneData, (_, nodes) => nodes);

sample({
  clock: sample({ clock: $selectedCity, filter: Boolean }),
  fn: (selectedCity) => ({ City: selectedCity! }),
  target: fetchAdressesFx,
});

forward({
  from: handleOnSearchDataChange,
  to: getHousingStockUniqueWorkingRangeFx,
});

forward({
  from: handleNodeChoosen,
  to: getNodeUniqueWorkingRangeFx,
});

forward({
  from: handleFetchNodes,
  to: getNodesFx,
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
