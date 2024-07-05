import { axios } from 'api/axios';
import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
  EHouseCategory,
  HousingStockResponse,
  NodeServiceZoneListResponse,
  NonResidentialBuildingResponse,
  PipeNodeResponse,
  PipeNodeValidationResultResponse,
} from 'api/types';
import { GetBuildingPayload } from './createNodeService.types';

export const getBuilding = async ({
  buildingId,
  houseCategory,
}: GetBuildingPayload): Promise<
  HousingStockResponse | NonResidentialBuildingResponse
> => {
  if (houseCategory === EHouseCategory.Living) {
    return await getHousingStock(buildingId);
  }
  return await getNonResidentialBuilding(buildingId);
};

const getHousingStock = (
  housingStockId: number,
): Promise<HousingStockResponse> =>
  axios.get(`/HousingStocks/${housingStockId}`);

const getNonResidentialBuilding = (
  buildingId: number,
): Promise<NonResidentialBuildingResponse> =>
  axios.get(`NonResidentialBuildings/${buildingId}`);

export const getCalculatorsList = (
  housingStockId: number,
): Promise<CalculatorIntoHousingStockResponse[] | null> =>
  axios.get(`Buildings/${housingStockId}/Calculators`);

export const getNodeServiceZones =
  (): Promise<NodeServiceZoneListResponse | null> =>
    axios.get('NodeServiceZones');

export const postPipeNode = (
  payload: CreatePipeNodeRequest,
): Promise<PipeNodeResponse> => axios.post('PipeNodes', payload);

export const fetchValidateNode = (
  payload: CreatePipeNodeRequest,
): Promise<PipeNodeValidationResultResponse> =>
  axios.post('PipeNodes/validate', payload);

export const deleteNodeServiceZone = (
  nodeServiceZoneId: number,
): Promise<void> => axios.delete(`NodeServiceZones/${nodeServiceZoneId}`);
