import axios from '01/axios';
import {
  ManagingFirmUserResponse,
  ManagingFirmUserCreateRequest,
  ManagingFirmUserListResponse,
} from './../../myApi';

export const addStaff = (
  data: ManagingFirmUserCreateRequest
): Promise<ManagingFirmUserResponse> => axios.post('ManagingFirmUsers', data);

export const fetchStaff = async () => {
  const res: {
    items: ManagingFirmUserListResponse[] | null;
  } = await axios.get('ManagingFirmUsers');

  return res?.items || null;
};

export const deleteManagingFirmUser = (id: number) =>
  axios.delete(`ManagingFirmUsers/${id}`);
