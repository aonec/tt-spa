import { axios } from 'api/axios';
import { BuildingFiltersResponse } from 'api/types';

export const getHosuingStockFilters = (): Promise<BuildingFiltersResponse> =>
  axios.get('Buildings/filters');
