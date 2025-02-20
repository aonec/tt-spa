import { useUnit } from 'effector-react';
import { reassignTasksService } from './reassignTasksService.models';
import { reassignTasksMutation } from './reassignTasksService.api';
import { tasksProfileService } from '../tasksProfileService.model';
import { FormModal } from 'ui-kit/Modals/FormModal';

const { inputs, outputs } = reassignTasksService;

export const ReassignTasksContainer = () => {
  const { isOpen, isLoading, closeModal } = useUnit({
    isOpen: outputs.$isModalOpen,
    closeModal: inputs.closeModal,
    selectedTasks: tasksProfileService.outputs.$selectedTasks,
    handleCloseTasks: reassignTasksMutation.start,
    isLoading: reassignTasksMutation.$pending,
  });

  return (
    <FormModal
      formId="reassign-tasks-modal"
      visible={isOpen}
      title={'Передать задачи'}
      submitBtnText="Передать"
      loading={isLoading}
      form={<></>}
      onCancel={closeModal}
    />
  );
};
