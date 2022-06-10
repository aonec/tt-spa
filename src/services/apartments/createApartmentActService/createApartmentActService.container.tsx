import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { createApartmentActService } from './createApartmentActService.model';
import { ApartmentActForm } from './view/ApartmentActForm';

export const CreateApartmentActContainer = () => {
  const { inputs, outputs } = createApartmentActService;

  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$createActIsLoading);
  const actTypes = useStore(outputs.$actTypes);

  const handleClose = useEvent(inputs.closeModal);

  const handleSubmit = useEvent(inputs.createDocument);
  const formId = 'create-apartment-document';

  const form = <ApartmentActForm formId={formId} handleSubmit={handleSubmit} actTypes={actTypes}/>;

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
