import { axios } from 'api/axios';
import { ESecuredIdentityRoleNameStringDictionaryItem } from 'api/myApi';

export const fetchUserRoles = (): Promise<
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
> => axios.get('OrganizationUsers/RoleTypes');
