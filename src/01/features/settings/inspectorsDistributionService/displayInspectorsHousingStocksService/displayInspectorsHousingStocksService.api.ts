import { axios } from '01/axios';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { InspectorOnHousingStockResponse } from 'myApi';

export const getInspectorsHousingStocks = (
  params: GetInspectorsHousingStocksRequestParams
): Promise<InspectorOnHousingStockResponse[] | null> => {
  console.log(params)
  return axios.get('HousingStocks/inspectors', { params });
};
