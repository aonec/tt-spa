import React, { FC } from 'react';
import { UsersListSelectProps } from './UsersListSelect.types';
import {
  Wrapper,
  UserName,
  UserWrapper,
  TasksCount,
} from './UsersListSelect.styled';

export const UsersListSelect: FC<UsersListSelectProps> = ({
  organizationUsersList,
}) => {
  return (
    <Wrapper>
      {organizationUsersList?.map((user) => (
        <UserWrapper>
          <UserName>
            {user.lastName} {user.firstName} {user.middleName}
          </UserName>
          <TasksCount>{user.executingTaskCount} задач</TasksCount>
        </UserWrapper>
      ))}
    </Wrapper>
  );
};
