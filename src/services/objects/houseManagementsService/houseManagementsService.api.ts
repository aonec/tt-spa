import { axios } from 'api/axios';
import { HouseManagementResponse } from 'api/types';
import { GetHouseManagementsRequestPayload } from './houseManagementsService.types';

export const getHouseManagements = (
  params: GetHouseManagementsRequestPayload,
): Promise<HouseManagementResponse[]> =>
  axios.get('HouseManagements', { params });
