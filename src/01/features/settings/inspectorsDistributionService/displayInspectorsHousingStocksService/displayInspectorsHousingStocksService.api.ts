import { axios } from '../../../../../api/axios';
import { InspectorOnHousingStockResponse } from '../../../../../api/types';
import { GetInspectorsHousingStocksRequestParams } from './types';

export const getInspectorsHousingStocks = (
  params: GetInspectorsHousingStocksRequestParams
): Promise<InspectorOnHousingStockResponse[] | null> => {
  return axios.get('HousingStocks/inspectors', { params });
};
