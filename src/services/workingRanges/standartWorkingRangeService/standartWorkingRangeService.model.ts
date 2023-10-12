import { createEffect, createEvent, createStore } from 'effector';
import { forward } from 'effector';
import { getStandartWorkingRange } from './standartWorkingRangeService.api';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';

const handleOnSearchDataChange = createEvent<{
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
}>();

const getStandartWorkingRangeFx = createEffect<
  {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getStandartWorkingRange);

const $standartWorkingRange = createStore<AllNodeWorkingRangeResponse | null>(
  null,
).on(getStandartWorkingRangeFx.doneData, (_, range) => range);

const $isLoading = getStandartWorkingRangeFx.pending;

forward({
  from: handleOnSearchDataChange,
  to: getStandartWorkingRangeFx,
});

export const standartWorkingRangeService = {
  inputs: { handleOnSearchDataChange },
  outputs: { $standartWorkingRange, $isLoading },
};
