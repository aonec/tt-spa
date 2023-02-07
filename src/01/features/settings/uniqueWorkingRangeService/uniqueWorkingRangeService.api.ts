import { axios } from '01/axios';
import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  NodeOnHousingStockResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import { GetAddressesRequestPayload } from 'services/objects/objectsProfileService/soiReportService/soiReportService.types';

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
  payload: GetAddressesRequestPayload
): Promise<StreetWithHousingStockNumbersResponsePagedList | null> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params: payload,
  });
};

export const getNodes = (
  housingStockId: number
): Promise<NodeOnHousingStockResponse[] | null> => {
  return axios.get(`HousingStocks/${housingStockId}/Nodes`);
};
