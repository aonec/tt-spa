import { axios } from 'api/axios';
import {
  CreateHouseManagementRequest,
  HouseManagementResponse,
} from 'api/types';
import { GetHouseManagementsRequestPayload } from './houseManagementsService.types';

export const getHouseManagements = (
  params: GetHouseManagementsRequestPayload,
): Promise<HouseManagementResponse[]> =>
  axios.get('HouseManagements', { params });

export const createHouseManagement = (
  requestPayload: CreateHouseManagementRequest,
): Promise<HouseManagementResponse | null> => {
  return axios.post('HouseManagements', requestPayload);
};
