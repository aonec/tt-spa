import { axios } from '01/axios';
import { HousingStockFilterResponse } from 'myApi';

export const getHosuingStockFilters = (): Promise<HousingStockFilterResponse> =>
  axios.get('HousingStocks/filters');
