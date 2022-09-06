import { axios } from '01/axios';
import { OrganizationUserListResponsePagedList } from 'myApi';

export const getOrganizationUsers = (): Promise<OrganizationUserListResponsePagedList> =>
  axios.get('OrganizationUsers');
