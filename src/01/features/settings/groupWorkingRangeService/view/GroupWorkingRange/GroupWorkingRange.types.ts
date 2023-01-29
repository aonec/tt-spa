import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';

export type GroupWorkingRangeProps = {
  groupWorkingRange: AllNodeWorkingRangeResponse | null;
  handleOnSearchDataChange: (payload: {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    houseManagementId: string;
  }) => void;
  isLoading: boolean;
};
