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
    preparedForOptionsAddresses,
    choоseLeadExecutor,
    executors,
    handleCreateTask,
    leadExecutors,
    workCategories,
    isCreatePending,
    handleSelectHousingAddress,
    existingApartmentNumbers,
    resourceDisconnection,
    handleSelectApartmentNumber,
    apartmentHomeownerNames,
    taskReasons,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    ERPSources: outputs.$ERPSources,
    preparedForOptionsAddresses: outputs.$preparedForOptionsAddresses,
    leadExecutors: outputs.$leadExecutors,
    workCategories: outputs.$workCategories,
    executors: outputs.$executors,
    handleCreateTask: inputs.handleCreateTask,
    choоseLeadExecutor: inputs.choоseLeadExecutor,
    isCreatePending: outputs.$isCreatePending,
    handleSelectHousingAddress: inputs.handleSelectHousingAddress,
    handleSelectApartmentNumber: inputs.handleSelectApartmentNumber,
    existingApartmentNumbers: outputs.$existingApartmentNumbers,
    resourceDisconnection: outputs.$resourceDisconnection,
    apartmentHomeownerNames: outputs.$apartmentHomeownerNames,
    taskReasons: outputs.$taskReasons,
  });

  return (
    <>
      <AddTaskModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        ERPSources={ERPSources}
        preparedForOptionsAddresses={preparedForOptionsAddresses}
        leadExecutors={leadExecutors}
        workCategories={workCategories}
        handleCreateTask={handleCreateTask}
        choоseLeadExecutor={choоseLeadExecutor}
        executors={executors}
        isCreatePending={isCreatePending}
        handleSelectHousingAddress={handleSelectHousingAddress}
        existingApartmentNumbers={existingApartmentNumbers}
        resourceDisconnection={resourceDisconnection}
        handleSelectApartmentNumber={handleSelectApartmentNumber}
        apartmentHomeownerNames={apartmentHomeownerNames}
        taskReasons={taskReasons}
      />
    </>
  );
};
