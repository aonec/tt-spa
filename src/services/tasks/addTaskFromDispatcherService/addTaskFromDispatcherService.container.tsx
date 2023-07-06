import React from 'react';
import { AddTaskModal } from './view/AddTaskModal';
import { addTaskFromDispatcherService } from './addTaskFromDispatcherService.models';
import { useUnit } from 'effector-react';

const { inputs, outputs } = addTaskFromDispatcherService;

export const AddTaskFromDispatcherContainer = () => {
  const {
    isModalOpen,
    handleCloseModal,
    ERPSources,
    ErpObjects,
    choоseLeadExecutor,
    executors,
    handleCreateTask,
    handleTaskDeadlineRequest,
    leadExecutors,
    taskDeadline,
    workCategories,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    ERPSources: outputs.$ERPSources,
    ErpObjects: outputs.$ErpObjects,
    leadExecutors: outputs.$leadExecutors,
    workCategories: outputs.$workCategories,
    executors: outputs.$executors,
    taskDeadline: outputs.$taskDeadline,
    handleCreateTask: inputs.handleCreateTask,
    choоseLeadExecutor: inputs.choоseLeadExecutor,
    handleTaskDeadlineRequest: inputs.handleTaskDeadlineRequest,
  });

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
        taskDeadline={taskDeadline}
      />
    </>
  );
};