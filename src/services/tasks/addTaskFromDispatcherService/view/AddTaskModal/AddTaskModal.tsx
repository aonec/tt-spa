import React, { FC, useState } from 'react';
import { AddTaskModalProps } from './AddTaskModal.types';
import { AddTaskForm } from './AddTaskForm/AddTaskForm';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';

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
  handleSelectTaskType,
  isManualDeadlineRequired,
  selectedTaskReasonOption,
  handleChangeSubscriberName,
  handleChangePhoneNumber,
  isSavePhoneNumberOpen,
  handleReplacePhoneNumber,
  handleClosePhoneNumber,
  onSuccessSavePhone,
  existingCities,
  defaultCity,
  handleChangeCity,
  handleSearchExecutor,
  executorsList,
  handleDialogOpen,
  isDialogOpen,
}) => {
  const [disableSubmit, setDisableSubmit] = useState(true);

  return (
    <>
      <FormModal
        title="Создание новой задачи"
        submitBtnText="Создать задачу"
        visible={isModalOpen}
        onCancel={() => handleDialogOpen(true)}
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
            handleSelectTaskType={handleSelectTaskType}
            isManualDeadlineRequired={isManualDeadlineRequired}
            selectedTaskReasonOption={selectedTaskReasonOption}
            handleChangeSubscriberName={handleChangeSubscriberName}
            handleChangePhoneNumber={handleChangePhoneNumber}
            isSavePhoneNumberOpen={isSavePhoneNumberOpen}
            handleReplacePhoneNumber={handleReplacePhoneNumber}
            handleClosePhoneNumber={handleClosePhoneNumber}
            onSuccessSavePhone={onSuccessSavePhone}
            existingCities={existingCities}
            defaultCity={defaultCity}
            handleChangeCity={handleChangeCity}
            handleSearchExecutor={handleSearchExecutor}
            executorsList={executorsList}
          />
        }
        formId={formId}
      />

      <Dialog
        zIndex={1100}
        width={600}
        title="Вы уверены, что хотите выйти?"
        description="Введенные данные при создании заявки не будут сохранены. Если вы хотите сохранить прогресс, вернитесь назад и завершите создание заявки."
        isOpen={isDialogOpen}
        onCancel={() => handleDialogOpen(false)}
        onSubmit={() => {
          handleCloseModal();
          handleDialogOpen(false);
        }}
        submitText="Выйти"
        cancelText="Продолжить создание заявки"
        type="danger"
      />
    </>
  );
};
