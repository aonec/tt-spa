import { axios } from 'api/axios';
import {
  ApartmentResponse,
  HousingStockResponse,
  TasksPagedList,
} from 'api/myApi';
import {
  FiltersGatePayload,
  GetTasksListRequestPayload,
} from './tasksProfileService.types';

export const getTasks = (
  filter: GetTasksListRequestPayload | null,
): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { ...filter, pageSize: 20 } });

export const fetchApartment = ({
  apartmentId,
}: FiltersGatePayload): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${apartmentId}`);

export const fetchHousingStock = ({
  housingStockId,
}: FiltersGatePayload): Promise<HousingStockResponse> =>
  axios.get(`HousingStocks/${housingStockId}`);
