import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'api/types';

export type StandartWorkingRangeProps = {
  standartWorkingRange: AllNodeWorkingRangeResponse | null;
  handleOnSearchDataChange: (payload: {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
  }) => void;
  isLoading: boolean;
};
