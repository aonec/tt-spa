import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ESecuredIdentityRoleName } from 'myApi';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Select } from 'ui-kit/Select';
import { TasksListPanel } from './TasksListPanel';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Input } from 'ui-kit/Input';
import { SearchIcon } from 'ui-kit/icons';
import {
  UserReassingment,
  UserTasksTransferModalProps,
} from './UserTasksTransferModal.types';
import {
  ContentWrapper,
  GreenPoint,
  Header,
  SearchWrapper,
  SelectRoleOptionWrapper,
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

  const [usersReassigments, setUsersReassigments] = useState<
    UserReassingment[]
  >([]);

  useEffect(() => {
    setSelectedRole(null);
  }, [isModalOpen]);

  useEffect(() => {
    const initialReassingments: UserReassingment[] =
      organizationUsersByRolesList?.map((elem) => ({
        role: elem.role,
        userId: null,
      })) || [];

    setUsersReassigments(initialReassingments);
  }, [organizationUsersByRolesList]);

  const filteredUsers = useMemo(() => {
    return (
      organizationUsersByRolesList
        ?.find((elem) => elem.role === selectedRole)
        ?.users?.filter((user) => user.id !== currentUser?.id) || []
    );
  }, [currentUser?.id, organizationUsersByRolesList, selectedRole]);

  const filteredTasks = useMemo(() => {
    return (
      organizationUserTasksByRoles?.find(
        (elem) => elem.role.key === selectedRole,
      )?.tasks || []
    );
  }, [organizationUserTasksByRoles, selectedRole]);

  const currentSelectedUser = useMemo(() => {
    return (
      usersReassigments.find((elem) => elem.role === selectedRole)?.userId ||
      null
    );
  }, [selectedRole, usersReassigments]);

  const handleSelectUser = useCallback(
    (userId: number) => {
      const isSelectedUser = userId === currentSelectedUser;
      const newValue = isSelectedUser ? null : userId;

      setUsersReassigments((prev) =>
        prev.map((elem) =>
          elem.role === selectedRole ? { ...elem, userId: newValue } : elem,
        ),
      );
    },
    [currentSelectedUser, selectedRole],
  );

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
        {organizationUserTasksByRoles?.map(({ role }) => {
          const reassingmentByRole = usersReassigments.find(
            (elem) => elem.role === role?.key,
          );

          const isReassigmentFilled = Boolean(reassingmentByRole?.userId);

          return (
            <Select.Option key={role.key} value={role.key!}>
              <SelectRoleOptionWrapper>
                <div>{role.value}</div>
                {isReassigmentFilled && <GreenPoint />}
              </SelectRoleOptionWrapper>
            </Select.Option>
          );
        })}
      </SelectSC>
    </Header>
  );

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
          <UsersListSelect
            selectedUser={currentSelectedUser}
            handleSelectUser={handleSelectUser}
            organizationUsersList={filteredUsers}
          />
        </ContentWrapper>
      }
      formId="user-tasks-transfer-form"
      submitBtnText="Назначить сотрудника"
    />
  );
};
