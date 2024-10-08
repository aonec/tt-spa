import { axios } from 'api/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  NodeOnHousingStockResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import { GetAddressesWithCityRequestPayload } from './uniqueWorkingRangeService.types';

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

export const getAdresses = (
  payload: GetAddressesWithCityRequestPayload,
): Promise<StreetWithBuildingNumbersResponsePagedList | null> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params: payload,
  });
};

export const getNodes = (
  housingStockId: number,
): Promise<NodeOnHousingStockResponse[] | null> => {
  return axios.get(`HousingStocks/${housingStockId}/Nodes`);
};
