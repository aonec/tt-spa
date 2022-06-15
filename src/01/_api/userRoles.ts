import { StringStringDictionaryItem } from './../../myApi';
import axios from '01/axios';

export const fetchUserRoles = (): Promise<
  StringStringDictionaryItem[] | null
> => axios.get('ManagingFirmUsers/RoleTypes');
