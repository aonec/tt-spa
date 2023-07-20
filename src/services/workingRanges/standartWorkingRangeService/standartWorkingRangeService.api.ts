import { axios } from 'api/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';

export const getStandartWorkingRange = (query: {
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
}): Promise<AllNodeWorkingRangeResponse | null> => {
  return axios.get('NodeWorkingRange', { params: query });
};
