import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { createApartmentActService } from './createApartmentActService.model';
import { CreateApartmentActForm } from './view/CreateApartmentActForm';

const formId = 'create-apartment-document';
const { inputs, outputs } = createApartmentActService;

export const CreateApartmentActModalContainer = () => {
  const { isLoading, isOpen, handleClose, handleSubmit } = useUnit({
    isOpen: outputs.$isModalOpen,
    isLoading: outputs.$createActIsLoading,
    handleClose: inputs.closeModal,
    handleSubmit: inputs.handleSubmit,
  });

  const form = (
    <CreateApartmentActForm formId={formId} handleSubmit={handleSubmit} />
  );

  return (
    <FormModal
      loading={isLoading}
      title="Добавить акт"
      visible={isOpen}
      onCancel={() => handleClose()}
      formId={formId}
      form={form}
    />
  );
};
