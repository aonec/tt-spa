import { axios } from '01/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
} from 'myApi';

export const getHousingStockUniqueWorkingRange = (query: {
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  housingStockId: number;
}): Promise<AllNodeWorkingRangeResponse | null> => {
  return axios.get(`NodeWorkingRange/HousingStock/${query.housingStockId}`, {
    params: query,
  });
};

export const getNodeUniqueWorkingRange = (query: {
  season: ENodeWorkingRangeSeason;
  nodeId: number;
}): Promise<AllNodeWorkingRangeResponse | null> => {
  return axios.get(`NodeWorkingRange/Node/${query.nodeId}`, {
    params: query,
  });
};
