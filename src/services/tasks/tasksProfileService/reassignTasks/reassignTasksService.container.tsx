import { useUnit } from 'effector-react';
import { reassignTasksService } from './reassignTasksService.models';
import {
  organizationUsersQuery,
  reassignTasksMutation,
} from './reassignTasksService.api';
import { tasksProfileService } from '../tasksProfileService.model';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Wrapper } from './reassignTasksService.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { useCallback, useEffect, useState } from 'react';

const {
  inputs,
  outputs,
  gates: { ReassignTasksGate },
} = reassignTasksService;

export const ReassignTasksContainer = () => {
  const {
    isOpen,
    isLoading,
    closeModal,
    selectedTasks,
    organizationUsers,
    handleReassign,
  } = useUnit({
    isOpen: outputs.$isModalOpen,
    closeModal: inputs.closeModal,
    selectedTasks: tasksProfileService.outputs.$selectedTasks,
    isLoading: reassignTasksMutation.$pending,
    organizationUsers: organizationUsersQuery.$data,
    handleReassign: reassignTasksMutation.start,
  });

  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const onSubmit = useCallback(() => {
    if (!selectedUser) return;

    handleReassign({
      taskIds: selectedTasks,
      newPerpetratorId: selectedUser,
    });
  }, [selectedTasks, handleReassign, selectedUser]);

  useEffect(() => {
    if (!isOpen) setSelectedUser(null);
  }, [isOpen]);

  return (
    <>
      <ReassignTasksGate />
      <FormModal
        formId="reassign-tasks-modal"
        visible={isOpen}
        title={'Передать задачи'}
        submitBtnText="Передать"
        loading={isLoading}
        onSubmit={onSubmit}
        disabled={!selectedUser}
        form={
          <Wrapper>
            <strong>Выбрано задач: {selectedTasks.length}</strong>
            <FormItem label="Новый исполнитель">
              <Select
                placeholder="Выберите из списка"
                value={selectedUser}
                onChange={(id) => setSelectedUser(id as number)}
              >
                {organizationUsers?.items?.map((elem) => (
                  <Select.Option key={elem.id} value={elem.id}>
                    {elem.firstName} {elem.lastName} {elem.middleName}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Wrapper>
        }
        onCancel={closeModal}
      />
    </>
  );
};
