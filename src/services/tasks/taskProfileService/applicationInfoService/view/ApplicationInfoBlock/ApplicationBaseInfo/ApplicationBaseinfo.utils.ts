import { ApplicationUserResponse } from 'api/types';

export function getApplicationUserName(user?: ApplicationUserResponse | null) {
  if (!user) return null;

  const middleName = user.middleName || '';
  const lastName = user.lastName || '';
  const firstName = user.firstName || '';

  return `${lastName} ${firstName} ${middleName}`;
}
