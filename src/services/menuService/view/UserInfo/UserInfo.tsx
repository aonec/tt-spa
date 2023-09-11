import { Tooltip } from 'ui-kit/shared/Tooltip';
import React, { FC, useMemo } from 'react';
import {
  UserEmail,
  UserEmailWrapper,
  UserManagingFirmName,
  UserInfoWrapper,
  UserIconSC,
  UserLoader,
} from './UserInfo.styled';
import { UserInfoProps } from './UserInfo.types';

export const UserInfo: FC<UserInfoProps> = ({ isLoading, currentUser }) => {
  const userEmail = useMemo(() => {
    if (!currentUser) {
      return <UserLoader active={isLoading} />;
    }

    return <UserEmail>{currentUser.email}</UserEmail>;
  }, [currentUser, isLoading]);

  return (
    <UserInfoWrapper>
      <UserEmailWrapper>
        <UserIconSC />
        <Tooltip title={currentUser?.email}>{userEmail}</Tooltip>
      </UserEmailWrapper>
      <UserManagingFirmName>
        {currentUser?.organization?.name}
      </UserManagingFirmName>
    </UserInfoWrapper>
  );
};
