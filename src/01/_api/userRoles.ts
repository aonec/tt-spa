import { UserRoleListResponse } from './../../myApi';
import axios from '01/axios';

export const fetchUserRoles = (): Promise<UserRoleListResponse[] | null> =>
  axios.get('UserRoles');
