import { useUnit } from 'effector-react';
import _ from 'lodash';
import { ESecuredIdentityRoleName } from 'api/types';
import { currentUserService } from 'services/currentUser/currentUserService';

export const usePermission = (permitedRoles: ESecuredIdentityRoleName[]) => {
  const { userRolesKeys } = useUnit({
    userRolesKeys: currentUserService.outputs.$userRolesKeys,
  });
  const result = Boolean(_.intersection(userRolesKeys, permitedRoles).length);

  return result;
};
