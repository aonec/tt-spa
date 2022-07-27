import axios from '01/axios';
import { AddOrganizationUserWorkingStatusRequest } from 'myApi';

export const postManagingFirmUserStatus = (
  data: AddOrganizationUserWorkingStatusRequest
) => axios.post('ManagingFirmUserWorkingStatuses', data);
