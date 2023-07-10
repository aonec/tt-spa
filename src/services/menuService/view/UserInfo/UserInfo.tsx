import { Tooltip } from 'antd';
import React, { FC } from 'react';
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
  return (
    <UserInfoWrapper>
      <UserEmailWrapper>
        <UserIconSC />
        <Tooltip title={currentUser?.email}>
          {!currentUser && <UserLoader active={isLoading} />}
          {currentUser && (
            <UserEmail>
              {currentUser?.email}
            </UserEmail>
          )}
        </Tooltip>
      </UserEmailWrapper>
      <UserManagingFirmName>
        {currentUser?.organization?.name}
      </UserManagingFirmName>
    </UserInfoWrapper>
  );
};
