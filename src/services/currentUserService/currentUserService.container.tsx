import React from 'react';
import { useUnit } from 'effector-react';
import { currentUserService } from './currentUserService.model';
import { UserProfile } from './UserProfile';

const { outputs } = currentUserService;

export const UserProfileContainer = () => {
  const { currentUser } = useUnit({
    currentUser: outputs.$currentUser,
  });

  return <UserProfile currentUser={currentUser} />;
};
