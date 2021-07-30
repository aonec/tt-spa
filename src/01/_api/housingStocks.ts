import { HousingStockListResponse } from './../../myApi';
import axios from '01/axios';

export const getHousingStocks = async () => {
  const res: { items: HousingStockListResponse[] } = await axios.get(
    'HousingStocks'
  );
  return res?.items;
};
