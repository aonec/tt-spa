import { axios } from '01/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';

export const getGroupWorkingRange = (query: {
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  houseManagementId: string;
}): Promise<AllNodeWorkingRangeResponse | null> => {
  return axios.get(
    `NodeWorkingRange/HouseManagement/${query.houseManagementId}`,
    { params: query }
  );
};
