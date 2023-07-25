import { axios } from 'api/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'api/types';

export const getStandartWorkingRange = (query: {
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
}): Promise<AllNodeWorkingRangeResponse | null> => {
  return axios.get('NodeWorkingRange', { params: query });
};
