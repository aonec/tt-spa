import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { createApartmentActService } from './createApartmentActService.models';
import { ApartmentActForm } from './view/ApartmentActForm';

export const CreateApartmentActContainer = () => {
  const { inputs, outputs } = createApartmentActService;

  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);

  const handleClose = useEvent(inputs.closeModal);

  const handleSubmit = useEvent(inputs.createDocument);
  const formId = 'create-apartment-document';

  const form = useMemo(
    () => (
      <ApartmentActForm
        formId={formId}
        handleSubmit={() => handleSubmit()}
      />
    ),
    [formId, handleSubmit]
  );

  return (
    <FormModal
      loading={isLoading}
      title="Добавить документ"
      visible={isOpen}
      onCancel={() => handleClose()}
      formId={formId}
      form={form}
    />
  );
};
