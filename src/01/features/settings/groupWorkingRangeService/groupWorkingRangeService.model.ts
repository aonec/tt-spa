import { createDomain, forward } from 'effector';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';
import { getGroupWorkingRange } from './groupWorkingRangeService.api';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('groupWorkingRangeService');

const handleOnSearchDataChange = domain.createEvent<{
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  houseManagementId: string;
}>();

const getGroupWorkingRangeFx = domain.createEffect<
  {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    houseManagementId: string;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getGroupWorkingRange);

const $groupWorkingRange = domain
  .createStore<AllNodeWorkingRangeResponse | null>(null)
  .on(getGroupWorkingRangeFx.doneData, (_, range) => range);

const $isLoading = getGroupWorkingRangeFx.pending;

forward({
  from: handleOnSearchDataChange,
  to: getGroupWorkingRangeFx,
});

export const groupWorkingRangeService = {
  inputs: { handleOnSearchDataChange },
  outputs: { $groupWorkingRange, $isLoading },
};
