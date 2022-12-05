import { axios } from '01/axios';
import {
  CalculatorIntoHousingStockResponse,
  HousingStockResponse,
  NodeServiceZoneListResponse,
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
