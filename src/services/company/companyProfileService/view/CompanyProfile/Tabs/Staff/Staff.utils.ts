import {
  ESecuredIdentityRoleName,
  ESecuredIdentityRoleNameStringDictionaryItem,
} from 'api/types';

const UserRolesPriorityDictionary: {
  [key in ESecuredIdentityRoleName]: number;
} = {
  [ESecuredIdentityRoleName.Admin]: 0,
  [ESecuredIdentityRoleName.Administrator]: 1,
  [ESecuredIdentityRoleName.SeniorOperator]: 2,
  [ESecuredIdentityRoleName.Operator]: 3,
  [ESecuredIdentityRoleName.ManagingFirmDispatcher]: 4,
  [ESecuredIdentityRoleName.ManagingFirmExecutor]: 5,
  [ESecuredIdentityRoleName.Controller]: 6,
  [ESecuredIdentityRoleName.ManagingFirmSpectator]: 7,
  [ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted]: 8,
  [ESecuredIdentityRoleName.Homeowner]: 9,
  [ESecuredIdentityRoleName.ErcService]: 10,
  [ESecuredIdentityRoleName.Worker]: 11,
};

export const sortUserRoles = (
  roles: ESecuredIdentityRoleNameStringDictionaryItem[],
) => {
  return roles.sort((a, b) => {
    const roleA = a.key;
    const roleB = b.key;

    if (!roleA || !roleB) {
      return -1;
    }

    const priorityOfA = UserRolesPriorityDictionary[roleA];
    const priorityOfB = UserRolesPriorityDictionary[roleB];

    if (priorityOfA < priorityOfB) {
      return -1;
    }
    if (priorityOfA > priorityOfB) {
      return 1;
    }
    return 0;
  });
};
