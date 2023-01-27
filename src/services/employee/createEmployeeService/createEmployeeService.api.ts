import { axios } from '01/axios';
import { OrganizationUserCreateRequest, OrganizationUserResponse } from 'myApi';

export const addStaff = (
  data: OrganizationUserCreateRequest,
): Promise<OrganizationUserResponse> => axios.post('OrganizationUsers', data);
