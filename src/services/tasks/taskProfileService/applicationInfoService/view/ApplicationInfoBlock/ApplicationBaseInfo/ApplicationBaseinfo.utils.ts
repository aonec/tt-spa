import { ApplicationUserResponse } from 'api/types';

export function getApplicationUserName(user?: ApplicationUserResponse | null) {
  if (!user) return null;

  return `${user.firstName} ${user.lastName} ${user.middleName}`;
}
