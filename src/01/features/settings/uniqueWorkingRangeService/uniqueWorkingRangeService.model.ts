import { createDomain, forward } from 'effector';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { getHousingStockUniqueWorkingRange } from './uniqueWorkingRangeService.api';

const domain = createDomain('uniqueWorkingRangeService');

const handleOnSearchDataChange = domain.createEvent<{
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  housingStockId: number;
}>();

const getHousingStockUniqueWorkingRangeFx = domain.createEffect<
  {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    housingStockId: number;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getHousingStockUniqueWorkingRange);

const $housingStockUniqueWorkingRange = domain
  .createStore<AllNodeWorkingRangeResponse | null>(null)
  .on(getHousingStockUniqueWorkingRangeFx.doneData, (_, range) => range);

const $isLoading = getHousingStockUniqueWorkingRangeFx.pending;

forward({
  from: handleOnSearchDataChange,
  to: getHousingStockUniqueWorkingRangeFx,
});

export const uniqueWorkingRangeService = {
  inputs: { handleOnSearchDataChange },
  outputs: { $housingStockUniqueWorkingRange, $isLoading },
};
