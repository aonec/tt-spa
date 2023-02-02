import { axios } from '01/axios';
import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
  HousingStockResponse,
  NodeServiceZoneListResponse,
  PipeNodeResponse,
} from 'myApi';

export const getHousingStock = (
  housingStockId: number
): Promise<HousingStockResponse> =>
  axios.get(`/HousingStocks/${housingStockId}`);

export const getCalculatorsList = (
  housingStockId: number
): Promise<CalculatorIntoHousingStockResponse[] | null> =>
  axios.get(`HousingStocks/${housingStockId}/Calculators`);

export const getNodeServiceZones = (): Promise<NodeServiceZoneListResponse | null> =>
  axios.get('NodeServiceZones');

export const postPipeNode = (
  payload: CreatePipeNodeRequest
): Promise<PipeNodeResponse> => axios.post('PipeNodes', payload);

// export interface NodeSetCommercialStatusRequest {
//   commercialStatus?: ENodeCommercialAccountStatus;
//   commercialAccountingDeregistrationDate?: string | null;
//   commercialStatusChangingDate?: string | null;
//   documentId?: number | null;
//   startCommercialAccountingDate?: string | null;
//   endCommercialAccountingDate?: string | null;
// }

// export interface CreatePipeNodeRequest {
//   number?: number;
//   nodeStatus?: ENodeCommercialAccountStatus | null;
//   commercialStatus?: ENodeCommercialAccountStatus | null;
//   nodeServiceZoneId?: number;
//   housingStockId?: number;
//   startCommercialAccountingDate?: string | null;
//   endCommercialAccountingDate?: string | null;
//   entryNumber?: number | null;
//   calculatorId?: number | null;
//   configuration?: EPipeNodeConfig;
//   communicationPipes?: CreateCommunicationPipeRequest[] | null;
// }