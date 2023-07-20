import { axios } from 'api/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'api/myApi';

export const getStandartWorkingRange = (query: {
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
}): Promise<AllNodeWorkingRangeResponse | null> => {
  return axios.get('NodeWorkingRange', { params: query });
};
