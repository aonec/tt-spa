import queryString from 'query-string';
import { axios } from '01/axios';
import { OrganizationUserListResponsePagedList } from 'myApi';

export const getOrganizationUsers = (
  RoleNames?: string[]
): Promise<OrganizationUserListResponsePagedList> =>
  axios.get('OrganizationUsers', {
    params: RoleNames && { RoleNames },
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });
