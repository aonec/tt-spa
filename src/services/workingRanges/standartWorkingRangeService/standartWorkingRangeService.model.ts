import { createDomain, forward } from 'effector';
import { getStandartWorkingRange } from './standartWorkingRangeService.api';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'api/myApi';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('standartWorkingRangeService');

const handleOnSearchDataChange = domain.createEvent<{
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
}>();

const getStandartWorkingRangeFx = domain.createEffect<
  {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getStandartWorkingRange);

const $standartWorkingRange = domain
  .createStore<AllNodeWorkingRangeResponse | null>(null)
  .on(getStandartWorkingRangeFx.doneData, (_, range) => range);

const $isLoading = getStandartWorkingRangeFx.pending;

forward({
  from: handleOnSearchDataChange,
  to: getStandartWorkingRangeFx,
});

export const standartWorkingRangeService = {
  inputs: { handleOnSearchDataChange },
  outputs: { $standartWorkingRange, $isLoading },
};
