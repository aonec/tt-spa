import { axios } from 'api/axios';
import { ESecuredIdentityRoleNameStringDictionaryItem } from 'api/types';

export const fetchUserRoles = (): Promise<
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
> => axios.get('OrganizationUsers/RoleTypes');
