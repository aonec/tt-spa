import axios from '01/axios';
import {
  ManagingFirmUserResponse,
  ManagingFirmUserCreateRequest,
} from './../../myApi';

export const addStaff = (
  data: ManagingFirmUserCreateRequest
): Promise<ManagingFirmUserResponse> => axios.post('ManagingFirmUsers', data);
