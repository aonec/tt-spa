import React, { FC } from 'react';
import { AddTaskModalProps } from './AddTaskModal.types';
import { AddTaskForm } from './AddTaskForm/AddTaskForm';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { getPreparedStreetsOptions } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.utils';

const formId = 'add-task-dispatcher-form';

export const AddTaskModal: FC<AddTaskModalProps> = ({
  handleCloseModal,
  isModalOpen,
  ERPSources,
  ErpObjects,
  leadExecutors,
  workCategories,
}) => {

  return (
    <FormModal
      title="Создание новой задачи"
      submitBtnText="Создать задачу"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={
        <AddTaskForm
          formId={formId}
          ERPSources={ERPSources}
          leadExecutors={leadExecutors}
          workCategories={workCategories}
          ErpObjects={ErpObjects}
        />
      }
      formId={formId}
    />
  );
};
