import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ESecuredIdentityRoleName,
  OrganizationUserTaskReassignment,
} from 'api/myApi';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Select } from 'ui-kit/Select';
import { TasksListPanel } from './TasksListPanel';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Input } from 'ui-kit/Input';
import { SearchIcon } from 'ui-kit/icons';
import {
  UserReassignment,
  UserTasksTransferModalProps,
} from './UserTasksTransferModal.types';
import {
  ContentWrapper,
  GrayPoint,
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
  isLoading,
  handleApplyTasksReassignment,
}) => {
  const [selectedRole, setSelectedRole] =
    useState<ESecuredIdentityRoleName | null>(null);

  const [usersReassignments, setUsersReassignments] = useState<
    UserReassignment[]
  >([]);

  const [userSearchText, setUserSearchText] = useState('');

  const onSubmit = () => {
    const filteredReassignments = usersReassignments.filter(
      (elem) => elem.userId,
    );

    handleApplyTasksReassignment(
      filteredReassignments as OrganizationUserTaskReassignment[],
    );
  };

  useEffect(() => {
    setSelectedRole(null);
  }, [isModalOpen]);

  useEffect(() => {
    const initialReassignments: UserReassignment[] =
      organizationUsersByRolesList?.map((elem) => ({
        role: elem.role,
        userId: null,
      })) || [];

    setUsersReassignments(initialReassignments);
  }, [organizationUsersByRolesList]);

  const filteredUsers = useMemo(() => {
    return (
      organizationUsersByRolesList
        ?.find((elem) => elem.role === selectedRole)
        ?.users?.filter((user) => user.id !== currentUser?.id)
        ?.filter(
          (user) =>
            `${user.lastName} ${user.firstName} ${user.middleName}`
              .toLowerCase()
              .indexOf(userSearchText.toLowerCase()) !== -1,
        ) || []
    );
  }, [
    currentUser?.id,
    organizationUsersByRolesList,
    selectedRole,
    userSearchText,
  ]);

  const filteredTasks = useMemo(() => {
    return (
      organizationUserTasksByRoles?.find(
        (elem) => elem.role.key === selectedRole,
      )?.tasks || []
    );
  }, [organizationUserTasksByRoles, selectedRole]);

  const currentSelectedUser = useMemo(() => {
    return (
      usersReassignments.find((elem) => elem.role === selectedRole)?.userId ||
      null
    );
  }, [selectedRole, usersReassignments]);

  const isDisabledSubmitButton = useMemo(() => {
    const neededReassignments = usersReassignments.filter((reassingment) => {
      const tasksByRole = organizationUserTasksByRoles?.find(
        ({ role }) => role.key === reassingment.role,
      );

      return Boolean(tasksByRole?.tasks?.length);
    });

    return !neededReassignments.every((reassingment) =>
      Boolean(reassingment.userId),
    );
  }, [organizationUserTasksByRoles, usersReassignments]);

  const handleSelectUser = useCallback(
    (userId: number) => {
      const isSelectedUser = userId === currentSelectedUser;
      const newValue = isSelectedUser ? null : userId;

      setUsersReassignments((prev) =>
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
          const reassingmentByRole = usersReassignments.find(
            (elem) => elem.role === role?.key,
          );

          const tasksByRole = organizationUserTasksByRoles?.find(
            ({ role: paramRole }) => paramRole.key === role?.key,
          );

          const isReassignmentNotNeed = !tasksByRole?.tasks?.length;
          const isReassignmentFilled = Boolean(reassingmentByRole?.userId);

          return (
            <Select.Option key={role.key} value={role.key!}>
              <SelectRoleOptionWrapper>
                <div>{role.value}</div>
                {isReassignmentNotNeed && !isReassignmentFilled && (
                  <GrayPoint />
                )}
                {isReassignmentFilled && <GreenPoint />}
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
      loading={isLoading}
      onSubmit={onSubmit}
      disabled={isDisabledSubmitButton}
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
              value={userSearchText}
              onChange={(e) => setUserSearchText(e.target.value)}
            />
            <SpaceLineWrapper>
              <SpaceLine />
            </SpaceLineWrapper>
          </SearchWrapper>
          <UsersListSelect
            isRoleSelected={Boolean(selectedRole)}
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
