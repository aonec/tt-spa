import { axios } from '01/axios';
import {
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponse,
} from 'myApi';

export const postEmloyeeStatus = (
  data: AddOrganizationUserWorkingStatusRequest
): Promise<OrganizationUserWorkingStatusResponse | null> =>
  axios.post('AddOrganizationUserWorkingStatusRequest', data);
