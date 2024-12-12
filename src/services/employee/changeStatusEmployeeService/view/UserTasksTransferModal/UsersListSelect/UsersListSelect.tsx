import React, { FC } from 'react';
import { UsersListSelectProps } from './UsersListSelect.types';
import {
  Wrapper,
  UserName,
  UserWrapper,
  TasksCount,
  TasksCountWrapper,
} from './UsersListSelect.styled';
import { getCountText } from 'utils/getCountText';
import { tasksCountTexts } from '../TasksListPanel/TasksListPanel.constants';
import { CheckMark } from 'ui-kit/icons';
import { Empty } from 'antd';

export const UsersListSelect: FC<UsersListSelectProps> = ({
  organizationUsersList,
  selectedUser,
  handleSelectUser,
  isRoleSelected,
}) => {
  const emptyDescription = isRoleSelected
    ? 'Нет подходящих сотрудников'
    : 'Выберите роль для просмотра сотрудников';

  return (
    <Wrapper>
      {organizationUsersList?.map((user) => {
        const isUserSelected = selectedUser === user.id;

        return (
          <UserWrapper
            key={user.id}
            isSelected={isUserSelected}
            onClick={() => handleSelectUser(user.id)}
          >
            <UserName>
              {user.lastName} {user.firstName} {user.middleName}
            </UserName>
            <TasksCountWrapper>
              <TasksCount>
                {user.executingTaskCount}{' '}
                {getCountText(user.executingTaskCount, tasksCountTexts)}
              </TasksCount>
              {isUserSelected && <CheckMark />}
            </TasksCountWrapper>
          </UserWrapper>
        );
      })}
      {!organizationUsersList?.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={emptyDescription}
        />
      )}
    </Wrapper>
  );
};
