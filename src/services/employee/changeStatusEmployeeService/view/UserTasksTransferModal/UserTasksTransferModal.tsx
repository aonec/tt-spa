import React, { FC } from 'react';
import { UserTasksTransferModalProps } from './UserTasksTransferModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const UserTasksTransferModal: FC<UserTasksTransferModalProps> = ({
  isModalOpen,
  organizationUserTasksByRoles,
}) => {
  return (
    <FormModal
      title="У сотрудника есть незавершенные задачи"
      visible={isModalOpen}
      form={
        <>
          {organizationUserTasksByRoles?.map((elem) =>
            elem.tasks.map((task) => <div>{task.name}</div>),
          )}
        </>
      }
      formId="user-tasks-transfer-form"
      submitBtnText="Назначить сотрудника"
    />
  );
};
