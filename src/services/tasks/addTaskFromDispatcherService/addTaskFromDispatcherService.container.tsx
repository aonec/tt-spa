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
    handleCreateTask,
    isCreatePending,
    handleSelectHousingAddress,
    preparedApartmentNumbers,
    resourceDisconnection,
    handleSelectApartmentNumber,
    apartmentHomeownerNames,
    taskReasons,
    handleSelectTaskReason,
    handleSelectTaskType,
    isManualDeadlineRequired,
    selectedTaskReasonOption,
    handleChangeSubscriberName,
    handleChangePhoneNumber,
    isSavePhoneNumberOpen,
    handleReplacePhoneNumber,
    handleClosePhoneNumber,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    ERPSources: outputs.$ERPSources,
    preparedForOptionsAddresses: outputs.$preparedForOptionsAddresses,
    handleCreateTask: inputs.handleCreateTask,
    isCreatePending: outputs.$isCreatePending,
    handleSelectHousingAddress: inputs.handleSelectHousingAddress,
    handleSelectApartmentNumber: inputs.handleSelectApartmentNumber,
    preparedApartmentNumbers: outputs.$preparedApartmentNumbers,
    resourceDisconnection: outputs.$resourceDisconnection,
    apartmentHomeownerNames: outputs.$apartmentHomeownerNames,
    taskReasons: outputs.$taskReasons,
    handleSelectTaskReason: inputs.handleSelectTaskReason,
    handleSelectTaskType: inputs.handleSelectTaskType,
    isManualDeadlineRequired: outputs.$isManualDeadlineRequired,
    selectedTaskReasonOption: outputs.$selectedTaskReasonOption,
    handleChangeSubscriberName: inputs.handleChangeSubscriberName,
    handleChangePhoneNumber: inputs.handleChangePhoneNumber,
    handleReplacePhoneNumber: inputs.handleReplacePhoneNumber,
    handleClosePhoneNumber: inputs.handleClosePhoneNumber,
    isSavePhoneNumberOpen: outputs.$isSavePhoneNumberOpen,
  });

  return (
    <>
      <AddTaskModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        ERPSources={ERPSources}
        preparedForOptionsAddresses={preparedForOptionsAddresses}
        handleCreateTask={handleCreateTask}
        isCreatePending={isCreatePending}
        handleSelectHousingAddress={handleSelectHousingAddress}
        existingApartmentNumbers={preparedApartmentNumbers}
        resourceDisconnection={resourceDisconnection}
        handleSelectApartmentNumber={handleSelectApartmentNumber}
        apartmentHomeownerNames={apartmentHomeownerNames}
        taskReasons={taskReasons}
        handleSelectTaskReason={handleSelectTaskReason}
        handleSelectTaskType={handleSelectTaskType}
        isManualDeadlineRequired={isManualDeadlineRequired}
        selectedTaskReasonOption={selectedTaskReasonOption}
        handleChangeSubscriberName={handleChangeSubscriberName}
        handleChangePhoneNumber={handleChangePhoneNumber}
        isSavePhoneNumberOpen={isSavePhoneNumberOpen}
        handleReplacePhoneNumber={handleReplacePhoneNumber}
        handleClosePhoneNumber={handleClosePhoneNumber}
        onSuccessSavePhone={inputs.onSuccessSavePhone}
      />
    </>
  );
};
