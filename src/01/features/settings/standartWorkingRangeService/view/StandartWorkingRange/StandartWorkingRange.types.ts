import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';

export type StandartWorkingRangeProps = {
  standartWorkingRange: AllNodeWorkingRangeResponse | null;
  handleOnSearchDataChange: (payload: {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
  }) => void;
  isLoading: boolean;
};
