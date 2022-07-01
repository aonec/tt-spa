import { ESecuredIdentityRoleNameStringDictionaryItem } from 'myApi';
import axios from '01/axios';

export const fetchUserRoles = (): Promise<
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
> => axios.get('ManagingFirmUsers/RoleTypes');