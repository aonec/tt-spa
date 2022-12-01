import { axios } from '01/axios';
import { HouseManagementResponse } from 'myApi';

export const getHouseManagements = (): Promise<
  HouseManagementResponse[] | null
> => {
  return axios.get('HouseManagements');
};
