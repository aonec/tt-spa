import { EOrganizationUserWorkingStatusType } from 'myApi';

export const OrganizationUserWorkingStatusDictionary: {
  [key in EOrganizationUserWorkingStatusType]: string;
} = {
  [EOrganizationUserWorkingStatusType.Working]: 'Работает',
  [EOrganizationUserWorkingStatusType.OnVacation]: 'В отпуске',
  [EOrganizationUserWorkingStatusType.Sick]: 'Болеет',
  [EOrganizationUserWorkingStatusType.OnDuty]: 'На дежурстве',
};
