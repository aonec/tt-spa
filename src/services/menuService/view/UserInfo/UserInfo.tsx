import { Tooltip } from 'antd';
import React, { FC } from 'react';
import {
  UserEmail,
  UserEmailWrapper,
  UserManagingFirmName,
  UserInfoWrapper,
  UserIconSC,
} from './UserInfo.styled';
import { UserInfoProps } from './UserInfo.types';

export const UserInfo: FC<UserInfoProps> = ({ isLoading, currentUser }) => {
  return (
    <UserInfoWrapper>
      <UserEmailWrapper>
        <UserIconSC />
        <Tooltip title={currentUser?.email}>
          <UserEmail to={`/user/${currentUser?.id}`}>
            {currentUser?.email}
          </UserEmail>
        </Tooltip>
      </UserEmailWrapper>
      <UserManagingFirmName>
        {currentUser?.organization?.name}
      </UserManagingFirmName>
    </UserInfoWrapper>
  );
};
