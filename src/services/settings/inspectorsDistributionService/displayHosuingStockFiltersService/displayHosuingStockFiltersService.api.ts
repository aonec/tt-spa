import { axios } from '01/axios';
import { BuildingFiltersResponse } from 'myApi';

export const getHosuingStockFilters = (): Promise<BuildingFiltersResponse> =>
  axios.get('Buildings/filters');
