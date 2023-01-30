import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';

export type UniqueWorkingRangeProps = {
  housingStockUniqueWorkingRange: AllNodeWorkingRangeResponse | null;
  isLoading: boolean;
  handleOnSearchDataChange: (payload: {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    housingStockId: number;
  }) => void;
};
