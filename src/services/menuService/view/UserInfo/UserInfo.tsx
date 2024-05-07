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
import { useMatch, useNavigate } from 'react-router-dom';

export const UserInfo: FC<UserInfoProps> = ({
  isLoading,
  currentUser,
  currentManagingFirm,
}) => {
  const isActive = useMatch('/currentUserProfile/:section?');
  console.log({ isActive });

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

  const navigate = useNavigate();

  return (
    <UserInfoWrapper>
      <UserEmailWrapper
        onClick={() => navigate('/currentUserProfile/mainInfo')}
      >
        <UserIconSC />
        {userEmail}
      </UserEmailWrapper>
      <UserManagingFirmName>{currentManagingFirm?.name}</UserManagingFirmName>
    </UserInfoWrapper>
  );
};
