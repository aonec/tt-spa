import { axios } from '01/axios';
import { ApartmentResponse, HousingStockResponse, TasksPagedList } from 'myApi';
import { GetTasksListRequestPayload } from './tasksProfileService.types';

export const getTasks = (
  filter: GetTasksListRequestPayload | null,
): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { ...filter, pageSize: 20 } });

export const fetchApartment = ({
  apartmentId,
}: {
  apartmentId: string;
}): Promise<ApartmentResponse> => axios.get(`Apartments/${apartmentId}`);

export const fetchHousingStock = ({
  housingStockId,
}: {
  housingStockId: string;
}): Promise<HousingStockResponse> =>
  axios.get(`HousingStocks/${housingStockId}`);
