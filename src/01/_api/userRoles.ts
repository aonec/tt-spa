import { UserRoleListResponse } from './../../myApi';
import axios from '01/axios';

export const fetchUserRoles = async (): Promise<
  UserRoleListResponse[] | null
> => {
  const res: { items?: any[] } = await axios.get('UserRoles/ForManagementFirm');

  return res?.items || null;
};
