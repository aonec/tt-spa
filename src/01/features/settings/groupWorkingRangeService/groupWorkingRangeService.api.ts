import { axios } from '01/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  HouseManagementResponse,
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

export const fetchHouseManagements = (): Promise<HouseManagementResponse[]> =>
  axios.get('HouseManagements');
