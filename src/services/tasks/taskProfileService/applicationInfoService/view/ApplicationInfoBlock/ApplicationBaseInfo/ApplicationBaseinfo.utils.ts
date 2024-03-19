import { ApplicationUserResponse } from 'api/types';

export function getApplicationUserName(user?: ApplicationUserResponse | null) {
  if (!user) return null;

  const middleName = user.middleName ? user.middleName : '';
  const lastName = user.lastName ? user.lastName : '';
  const firstName = user.firstName ? user.firstName : '';

  return `${firstName} ${lastName} ${middleName}`;
}
