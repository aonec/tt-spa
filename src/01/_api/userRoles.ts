import { ESecuredIdentityRoleNameStringDictionaryItem } from '../../api/types';
import axios from '../../api/axios';

export const fetchUserRoles = (): Promise<
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
> => axios.get('ManagingFirmUsers/RoleTypes');