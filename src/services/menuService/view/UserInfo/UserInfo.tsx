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
  isOpen,
}) => {
  const isActive = Boolean(useMatch('/currentUserProfile/:section?'));

  const userEmail = useMemo(() => {
    if (!currentUser) {
      return <UserLoader active={isLoading} />;
    }

    return (
      <Tooltip title={currentUser.email}>
        <UserEmail isActive={isActive}>{currentUser.email}</UserEmail>
      </Tooltip>
    );
  }, [currentUser, isLoading, isActive]);

  const navigate = useNavigate();

  return (
    <UserInfoWrapper>
      <UserEmailWrapper
        onClick={() => navigate('/currentUserProfile/mainInfo')}
      >
        <UserIconSC />
        {isOpen && userEmail}
      </UserEmailWrapper>
      {isOpen && (
        <UserManagingFirmName>{currentManagingFirm?.name}</UserManagingFirmName>
      )}
    </UserInfoWrapper>
  );
};
