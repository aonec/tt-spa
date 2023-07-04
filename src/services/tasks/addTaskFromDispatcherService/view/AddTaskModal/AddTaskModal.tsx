import React, { FC, useState } from 'react';
import { AddTaskModalProps } from './AddTaskModal.types';
import { AddTaskForm } from './AddTaskForm/AddTaskForm';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';

const formId = 'add-task-dispatcher-form';

export const AddTaskModal: FC<AddTaskModalProps> = ({
  handleCloseModal,
  isModalOpen,
  ERPSources,
  ErpObjects,
  leadExecutors,
  workCategories,
  handleCreateTask,
  choоseLeadExecutor,
  executors,
  handleTaskDeadlineRequest,
  taskDeadline,
  isCreatePending,
}) => {
  const [disableSubmit, setDisableSubmit] = useState(true);

  return (
    <FormModal
      title="Создание новой задачи"
      submitBtnText="Создать задачу"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      disabled={disableSubmit}
      loading={isCreatePending}
      form={
        <AddTaskForm
          formId={formId}
          ERPSources={ERPSources}
          leadExecutors={leadExecutors}
          workCategories={workCategories}
          ErpObjects={ErpObjects}
          handleCreateTask={handleCreateTask}
          setDisableSubmit={setDisableSubmit}
          choоseLeadExecutor={choоseLeadExecutor}
          executors={executors}
          handleTaskDeadlineRequest={handleTaskDeadlineRequest}
          taskDeadline={taskDeadline}
        />
      }
      formId={formId}
    />
  );
};
