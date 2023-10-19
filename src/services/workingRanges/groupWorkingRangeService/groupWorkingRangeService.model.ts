import { createEffect, createEvent, createStore } from 'effector';
import { forward } from 'effector';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  HouseManagementResponse,
} from 'api/types';
import {
  fetchHouseManagements,
  getGroupWorkingRange,
} from './groupWorkingRangeService.api';
import { EffectFailDataAxiosError } from 'types';
import { createGate } from 'effector-react';

const getHouseManagementsFx = createEffect<void, HouseManagementResponse[]>(
  fetchHouseManagements,
);
const $houseManagements = createStore<HouseManagementResponse[]>([]).on(
  getHouseManagementsFx.doneData,
  (_, managements) => managements,
);

const handleOnSearchDataChange = createEvent<{
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  houseManagementId: string;
}>();

const getGroupWorkingRangeFx = createEffect<
  {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    houseManagementId: string;
  },
  AllNodeWorkingRangeResponse | null,
  EffectFailDataAxiosError
>(getGroupWorkingRange);

const $groupWorkingRange = createStore<AllNodeWorkingRangeResponse | null>(
  null,
).on(getGroupWorkingRangeFx.doneData, (_, range) => range);

const GroupWorkingRangeGate = createGate();

const $isLoading = getGroupWorkingRangeFx.pending;

forward({
  from: handleOnSearchDataChange,
  to: getGroupWorkingRangeFx,
});

forward({
  from: GroupWorkingRangeGate.open,
  to: getHouseManagementsFx,
});

export const groupWorkingRangeService = {
  inputs: { handleOnSearchDataChange },
  outputs: { $groupWorkingRange, $isLoading, $houseManagements },
  gates: { GroupWorkingRangeGate },
};
