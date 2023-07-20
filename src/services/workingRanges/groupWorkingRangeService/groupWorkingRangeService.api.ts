import { axios } from 'api/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  HouseManagementResponse,
} from 'api/myApi';

export const getGroupWorkingRange = (query: {
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  houseManagementId: string;
}): Promise<AllNodeWorkingRangeResponse | null> => {
  return axios.get(
    `NodeWorkingRange/HouseManagement/${query.houseManagementId}`,
    { params: query },
  );
};

export const fetchHouseManagements = (): Promise<HouseManagementResponse[]> =>
  axios.get('HouseManagements');
