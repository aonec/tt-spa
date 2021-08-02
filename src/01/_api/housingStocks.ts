import { HousingStockListResponse } from './../../myApi';
import axios from '01/axios';

export interface GetHousingStockParams {}

export const getHousingStocks = async (params: GetHousingStockParams) => {
  const res: { items: HousingStockListResponse[] } = await axios.get(
    'HousingStocks'
  );
  return res?.items;
};
