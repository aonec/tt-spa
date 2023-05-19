import React, { FC, useState } from 'react';
import { UserTasksTransferModalProps } from './UserTasksTransferModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import {
  ContentWrapper,
  Header,
  SelectSC,
} from './UserTasksTransferModal.styled';
import { Select } from 'ui-kit/Select';
import { TasksListPanel } from './TasksListPanel';
import { ESecuredIdentityRoleName } from 'myApi';

export const UserTasksTransferModal: FC<UserTasksTransferModalProps> = ({
  isModalOpen,
  organizationUserTasksByRoles,
  handleCloseModal,
  currentUser,
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
        </ContentWrapper>
      }
      formId="user-tasks-transfer-form"
      submitBtnText="Назначить сотрудника"
    />
  );
};
