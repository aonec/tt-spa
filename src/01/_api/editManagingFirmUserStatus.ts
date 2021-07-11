import axios from '01/axios';
import { AddManagingFirmUserWorkingStatusRequest } from 'myApi';

export const postManagingFirmUserStatus = (
  data: AddManagingFirmUserWorkingStatusRequest,
) => axios.post('ManagingFirmUserWorkingStatuses', data);
