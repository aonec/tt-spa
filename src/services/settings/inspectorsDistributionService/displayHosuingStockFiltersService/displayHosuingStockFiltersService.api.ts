import { axios } from 'api/axios';
import { BuildingFiltersResponse } from 'myApi';

export const getHosuingStockFilters = (): Promise<BuildingFiltersResponse> =>
  axios.get('Buildings/filters');
