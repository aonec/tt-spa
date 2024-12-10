import { OrganizationUserResponse } from 'api/types';

export type Props = {
  currentUser: OrganizationUserResponse | null;
};

export enum UserProfileSection {
  MainInfo = 'mainInfo',
  Notifications = 'notifications',
  RegularReports = 'regularReports',
}
