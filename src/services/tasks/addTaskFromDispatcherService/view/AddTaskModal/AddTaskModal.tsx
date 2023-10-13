import React, { FC, useState } from 'react';
import { AddTaskModalProps } from './AddTaskModal.types';
import { AddTaskForm } from './AddTaskForm/AddTaskForm';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';

const formId = 'add-task-dispatcher-form';

export const AddTaskModal: FC<AddTaskModalProps> = ({
  handleCloseModal,
  isModalOpen,
  ERPSources,
  handleCreateTask,
  isCreatePending,
  handleSelectHousingAddress,
  existingApartmentNumbers,
  resourceDisconnection,
  handleSelectApartmentNumber,
  apartmentHomeownerNames,
  taskReasons,
  preparedForOptionsAddresses,
  handleSelectTaskReason,
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
          preparedForOptionsAddresses={preparedForOptionsAddresses}
          handleCreateTask={handleCreateTask}
          setDisableSubmit={setDisableSubmit}
          handleSelectHousingAddress={handleSelectHousingAddress}
          existingApartmentNumbers={existingApartmentNumbers}
          resourceDisconnection={resourceDisconnection}
          handleSelectApartmentNumber={handleSelectApartmentNumber}
          apartmentHomeownerNames={apartmentHomeownerNames}
          taskReasons={taskReasons}
          handleSelectTaskReason={handleSelectTaskReason}
        />
      }
      formId={formId}
    />
  );
};
