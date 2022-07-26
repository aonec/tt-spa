import { axios } from '../../api/axios';
import { HousingStockFilterResponse } from '../../api/types';

export const getHosuingStockFilters = (): Promise<HousingStockFilterResponse> =>
  axios.get('HousingStocks/filters');
