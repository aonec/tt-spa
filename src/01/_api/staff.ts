import axios from '01/axios';
import {
  OrganizationUserResponse,
  OrganizationUserCreateRequest,
  OrganizationUserListResponse,
  OrganizationUserUpdateRequest,
} from './../../myApi';

export const addStaff = (
  data: OrganizationUserCreateRequest
): Promise<OrganizationUserResponse> => axios.post('OrganizationUsers', data);

export const fetchStaff = async () => {
  const res: {
    items: OrganizationUserListResponse[] | null;
  } = await axios.get('OrganizationUsers');

  return res?.items || null;
};

export const deleteManagingFirmUser = (id: number) =>
  axios.post(`OrganizationUsers/${id}/suspend`);

export const putManagingFirmUser = (
  payload: { id: number } & OrganizationUserUpdateRequest
): Promise<OrganizationUserResponse> =>
  axios.put(`OrganizationUsers/${payload.id}`, payload);
