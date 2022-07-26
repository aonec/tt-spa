import { axios } from '../../api/axios';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { InspectorOnHousingStockResponse } from '../../api/types';

export const getInspectorsHousingStocks = (
  params: GetInspectorsHousingStocksRequestParams
): Promise<InspectorOnHousingStockResponse[] | null> => {
  return axios.get('HousingStocks/inspectors', { params });
};
