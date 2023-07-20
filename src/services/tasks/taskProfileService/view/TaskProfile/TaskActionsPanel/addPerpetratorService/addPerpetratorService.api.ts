import queryString from 'query-string';
import { axios } from 'api/axios';
import { OrganizationUserListResponsePagedList } from 'api/myApi';

export const getOrganizationUsers = (
  RoleNames: string[] | null,
): Promise<OrganizationUserListResponsePagedList> =>
  axios.get('OrganizationUsers', {
    params: RoleNames && { RoleNames },
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });
