import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from '../../../ui-kit/Modals/FormModal/FormModal';
import { createApartmentActService } from './createApartmentActService.model';
import { CreateApartmentActForm } from './view/CreateApartmentActForm';

const { inputs, outputs } = createApartmentActService;

export const CreateApartmentActModalContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$createActIsLoading);
  const actTypes = useStore(outputs.$actTypes);

  const handleClose = useEvent(inputs.closeModal);

  const handleSubmit = useEvent(inputs.createAct);
  const formId = 'create-apartment-document';

  const form = (
    <CreateApartmentActForm
      formId={formId}
      handleSubmit={handleSubmit}
      actTypes={actTypes}
    />
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
