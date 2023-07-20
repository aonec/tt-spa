import { useStore } from 'effector-react';
import _ from 'lodash';
import { ESecuredIdentityRoleName } from 'api/myApi';
import { currentUserService } from 'services/currentUserService';

export const usePermission = (permitedRoles: ESecuredIdentityRoleName[]) => {
  const userRolesKeys = useStore(currentUserService.outputs.$userRolesKeys);
  const result = Boolean(_.intersection(userRolesKeys, permitedRoles).length);

  return result;
};
