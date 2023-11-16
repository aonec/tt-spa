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

    return (
      <Tooltip title={currentUser.email}>
        <UserEmail>{currentUser.email}</UserEmail>
      </Tooltip>
    );
  }, [currentUser, isLoading]);

  return (
    <UserInfoWrapper>
      <UserEmailWrapper>
        <UserIconSC />
        {userEmail}
      </UserEmailWrapper>
      <UserManagingFirmName>
        {currentUser?.organization?.name}
      </UserManagingFirmName>
    </UserInfoWrapper>
  );
};
