import React, { FC, useEffect, useState } from 'react';
import { ESecuredIdentityRoleName } from 'myApi';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Select } from 'ui-kit/Select';
import { TasksListPanel } from './TasksListPanel';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Input } from 'ui-kit/Input';
import { SearchIcon } from 'ui-kit/icons';
import { UserTasksTransferModalProps } from './UserTasksTransferModal.types';
import {
  ContentWrapper,
  Header,
  SearchWrapper,
  SelectSC,
  SpaceLineWrapper,
} from './UserTasksTransferModal.styled';
import { UsersListSelect } from './UsersListSelect';

export const UserTasksTransferModal: FC<UserTasksTransferModalProps> = ({
  isModalOpen,
  organizationUserTasksByRoles,
  handleCloseModal,
  currentUser,
  organizationUsersByRolesList,
}) => {
  const [selectedRole, setSelectedRole] =
    useState<ESecuredIdentityRoleName | null>(null);

  const header = (
    <Header>
      <h4>
        {currentUser?.lastName} {currentUser?.firstName}{' '}
        {currentUser?.middleName}
      </h4>
      <SelectSC
        small
        placeholder="Выберите роль"
        value={selectedRole || undefined}
        onChange={(value) => setSelectedRole(value as ESecuredIdentityRoleName)}
      >
        {organizationUserTasksByRoles?.map(({ role }) => (
          <Select.Option key={role.key} value={role.key!}>
            {role.value}
          </Select.Option>
        ))}
      </SelectSC>
    </Header>
  );

  const filteredTasks =
    organizationUserTasksByRoles?.find((elem) => elem.role.key === selectedRole)
      ?.tasks || [];

  const filteredUsers =
    organizationUsersByRolesList?.find((elem) => elem.role === selectedRole)
      ?.users || [];

  useEffect(() => {
    setSelectedRole(null);
  }, [isModalOpen]);

  return (
    <FormModal
      title="У сотрудника есть незавершенные задачи"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={
        <ContentWrapper>
          {header}
          <TasksListPanel
            filteredTasks={filteredTasks}
            selectedRole={selectedRole}
          />
          <SearchWrapper>
            <Input
              small
              prefix={<SearchIcon />}
              placeholder="Введите ФИО сотрудника"
            />
            <SpaceLineWrapper>
              <SpaceLine />
            </SpaceLineWrapper>
          </SearchWrapper>
          <UsersListSelect organizationUsersList={filteredUsers} />
        </ContentWrapper>
      }
      formId="user-tasks-transfer-form"
      submitBtnText="Назначить сотрудника"
    />
  );
};
