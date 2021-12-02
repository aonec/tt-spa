import { HousingStockListResponse, HousingStockResponse } from './../../myApi';
import axios from '01/axios';
import { formQueryString } from '01/utils/formQueryString';

export interface GetHousingStockParams {
  City: string;
  Street: string;
  HousingStockNumber: string;
  Corpus: string;
}

export const getHousingStocks = async (params: GetHousingStockParams) => {
  const queryString = formQueryString(params);
  const res: { items: HousingStockListResponse[] } = await axios.get(
    `HousingStocks${queryString}`
  );
  return res?.items;
};

export const getHousingStock = async (
  id: number
): Promise<HousingStockResponse> => {
  return await axios.get(`HousingStocks/${id}`);
};
