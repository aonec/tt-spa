import React, { FC } from 'react';
import { UsersListSelectProps } from './UsersListSelect.types';
import {
  Wrapper,
  UserName,
  UserWrapper,
  TasksCount,
} from './UsersListSelect.styled';
import { getCountText } from 'utils/getCountText';
import { tasksCountTexts } from '../TasksListPanel/TasksListPanel.constants';

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
          <TasksCount>
            {user.executingTaskCount}{' '}
            {getCountText(user.executingTaskCount, tasksCountTexts)}
          </TasksCount>
        </UserWrapper>
      ))}
    </Wrapper>
  );
};
