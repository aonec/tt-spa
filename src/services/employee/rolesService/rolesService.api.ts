import { axios } from 'api/axios';
import { ESecuredIdentityRoleNameStringDictionaryItem } from 'myApi';

export const fetchUserRoles = (): Promise<
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
> => axios.get('OrganizationUsers/RoleTypes');
