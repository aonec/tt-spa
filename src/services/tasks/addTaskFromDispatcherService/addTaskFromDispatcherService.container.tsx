import React from 'react';
import { AddTaskModal } from './view/AddTaskModal';
import { addTaskFromDispatcherService } from './addTaskFromDispatcherService.models';
import { useUnit } from 'effector-react';

const { inputs, outputs } = addTaskFromDispatcherService;

export const AddTaskFromDispatcherContainer = () => {
  const { isModalOpen, handleCloseModal } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
  });
  const ERPSources = useUnit(outputs.$ERPSources);
  const ErpObjects = useUnit(outputs.$ErpObjects);
  const leadExecutors = useUnit(outputs.$leadExecutors);
  const workCategories = useUnit(outputs.$workCategories);
  const executors = useUnit(outputs.$executors);
  const taskDeadlineRequest = useUnit(outputs.$taskDeadlineRequest);
  const taskDeadline = useUnit(outputs.$taskDeadline);
  console.log(taskDeadline)

  const handleCreateTask = useUnit(inputs.handleCreateTask);
  const choоseLeadExecutor = useUnit(inputs.choоseLeadExecutor);
  const handleTaskDeadlineRequest = useUnit(inputs.handleTaskDeadlineRequest);

  return (
    <>
      <AddTaskModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        ERPSources={ERPSources}
        ErpObjects={ErpObjects}
        leadExecutors={leadExecutors}
        workCategories={workCategories}
        handleCreateTask={handleCreateTask}
        choоseLeadExecutor={choоseLeadExecutor}
        executors={executors}
        handleTaskDeadlineRequest={handleTaskDeadlineRequest}
      />
    </>
  );
};
