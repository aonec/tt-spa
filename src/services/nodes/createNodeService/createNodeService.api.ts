import { axios } from '01/axios';
import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
  HousingStockResponse,
  NodeServiceZoneListResponse,
  PipeNodeResponse,
  PipeNodeValidationResultResponse,
} from 'myApi';

export const getHousingStock = (
  housingStockId: number,
): Promise<HousingStockResponse> =>
  axios.get(`/HousingStocks/${housingStockId}`);

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
