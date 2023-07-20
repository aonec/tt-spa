import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  HouseManagementResponse,
} from 'api/types';

export type GroupWorkingRangeProps = {
  groupWorkingRange: AllNodeWorkingRangeResponse | null;
  handleOnSearchDataChange: (payload: {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    houseManagementId: string;
  }) => void;
  isLoading: boolean;
  houseManagements: HouseManagementResponse[];
};
