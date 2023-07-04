import { axios } from '01/axios';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { InspectorOnBuildingResponse } from 'myApi';

export const getInspectorsHousingStocks = (
  params: GetInspectorsHousingStocksRequestParams,
): Promise<InspectorOnBuildingResponse[] | null> => {
  return axios.get('Buildings/inspectors', { params });
};
