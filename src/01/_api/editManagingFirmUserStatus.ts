import axios from '../../api/axios';
import { AddOrganizationUserWorkingStatusRequest } from '../../api/types';

export const postManagingFirmUserStatus = (
  data: AddOrganizationUserWorkingStatusRequest
) => axios.post('ManagingFirmUserWorkingStatuses', data);
