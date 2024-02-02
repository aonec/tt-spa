import { axios } from 'api/axios';
import { OrganizationResponse } from 'api/types';

export const getCurrentManagingFirm =
  (): Promise<OrganizationResponse | null> => {
    return axios.get('Organizations/current');
  };
