import { axios } from 'api/axios';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { InspectorOnBuildingResponse } from 'api/types';

export const getInspectorsHousingStocks = (
  params: GetInspectorsHousingStocksRequestParams,
): Promise<InspectorOnBuildingResponse[] | null> => {
  return axios.get('Buildings/inspectors', { params });
};
