import { ESecuredIdentityRoleName } from 'api/types';
import { MenuFiltrationConfig, MenuType } from './menuService.types';

export const privates: MenuFiltrationConfig = {
  [MenuType.Meters]: [
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.SeniorOperator,
  ],
  [MenuType.Services]: [
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.SeniorOperator,
  ],
  [MenuType.ActsJournal]: [
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.SeniorOperator,
  ],
  [MenuType.Reports]: [ESecuredIdentityRoleName.SeniorOperator],
  [MenuType.Settings]: [ESecuredIdentityRoleName.SeniorOperator],
  [MenuType.CompanyProfile]: [
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ],
  [MenuType.SettingsAdministrator]: [
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ],
  [MenuType.DisabledResourcesDispatcher]: [
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
  ],
  [MenuType.SupervisorAnalytics]: [ESecuredIdentityRoleName.Supervisor],
};

export const hidden: MenuFiltrationConfig = {
  [MenuType.Devices]: [
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
    ESecuredIdentityRoleName.Supervisor,
  ],
  [MenuType.Statistics]: [
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
    ESecuredIdentityRoleName.Supervisor,
  ],
  [MenuType.Buildings]: [ESecuredIdentityRoleName.Supervisor],
};
