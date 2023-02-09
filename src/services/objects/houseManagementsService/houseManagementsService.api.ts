import { axios } from '01/axios';
import { HouseManagementResponse } from 'myApi';
import { GetHouseManagementsRequestPayload } from './houseManagementsService.types';

export const getHouseManagements = (
  params: GetHouseManagementsRequestPayload
): Promise<HouseManagementResponse[]> =>
  axios.get('HouseManagements', { params });
