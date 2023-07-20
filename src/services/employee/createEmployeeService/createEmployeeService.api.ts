import { axios } from 'api/axios';
import {
  OrganizationUserCreateRequest,
  OrganizationUserResponse,
} from 'api/myApi';

export const addStaff = (
  data: OrganizationUserCreateRequest,
): Promise<OrganizationUserResponse> => axios.post('OrganizationUsers', data);
