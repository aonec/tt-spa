import axios from '01/axios';
import {
  ManagingFirmUserResponse,
  ManagingFirmUserCreateRequest,
  ManagingFirmUserListResponse,
  ManagingFirmUserUpdateRequest,
} from './../../myApi';

export const addStaff = (
  data: ManagingFirmUserCreateRequest
): Promise<ManagingFirmUserResponse> => axios.post('OrganizationUsers', data);

export const fetchStaff = async () => {
  const res: {
    items: ManagingFirmUserListResponse[] | null;
  } = await axios.get('OrganizationUsers');

  return res?.items || null;
};

export const deleteManagingFirmUser = (id: number) =>
  axios.post(`OrganizationUsers/${id}/suspend`);

export const putManagingFirmUser = (
  payload: { id: number } & ManagingFirmUserUpdateRequest
): Promise<ManagingFirmUserResponse> =>
  axios.put(`OrganizationUsers/${payload.id}`, payload);
