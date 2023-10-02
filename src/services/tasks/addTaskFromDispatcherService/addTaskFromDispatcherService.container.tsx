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
    isCreatePending,
    handleSelectHousingAddress,
    preparedApartmentNumbers,
    resourceDisconnection,
    handleSelectApartmentNumber,
    apartmentHomeownerNames,
    taskReasons,
    handleSelectTaskReason,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    ERPSources: outputs.$ERPSources,
    preparedForOptionsAddresses: outputs.$preparedForOptionsAddresses,
    leadExecutors: outputs.$leadExecutors,
    executors: outputs.$executors,
    handleCreateTask: inputs.handleCreateTask,
    choоseLeadExecutor: inputs.choоseLeadExecutor,
    isCreatePending: outputs.$isCreatePending,
    handleSelectHousingAddress: inputs.handleSelectHousingAddress,
    handleSelectApartmentNumber: inputs.handleSelectApartmentNumber,
    preparedApartmentNumbers: outputs.$preparedApartmentNumbers,
    resourceDisconnection: outputs.$resourceDisconnection,
    apartmentHomeownerNames: outputs.$apartmentHomeownerNames,
    taskReasons: outputs.$taskReasons,
    handleSelectTaskReason: inputs.handleSelectTaskReason,
  });

  return (
    <>
      <AddTaskModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        ERPSources={ERPSources}
        preparedForOptionsAddresses={preparedForOptionsAddresses}
        leadExecutors={leadExecutors}
        handleCreateTask={handleCreateTask}
        choоseLeadExecutor={choоseLeadExecutor}
        executors={executors}
        isCreatePending={isCreatePending}
        handleSelectHousingAddress={handleSelectHousingAddress}
        existingApartmentNumbers={preparedApartmentNumbers}
        resourceDisconnection={resourceDisconnection}
        handleSelectApartmentNumber={handleSelectApartmentNumber}
        apartmentHomeownerNames={apartmentHomeownerNames}
        taskReasons={taskReasons}
        handleSelectTaskReason={handleSelectTaskReason}
      />
    </>
  );
};
