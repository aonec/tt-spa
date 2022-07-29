import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { Dialog } from '../../../ui-kit/shared_components/Dialog/Dialog';
import { deleteApartmentActService } from './deleteApartmentActService.models';

const { inputs, outputs } = deleteApartmentActService;

export const DeleteApartmentActModalContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$deleteActIsLoading);

  const handleClose = useEvent(inputs.closeModal);
  const handleSubmit = useEvent(inputs.deleteAct);

  return (
    <Dialog
      title="Вы действительно хотите удалить акт?"
      isOpen={isOpen}
      isLoading={isLoading}
      onCancel={() => handleClose()}
      onSubmit={() => handleSubmit()}
      submitText="Удалить документ"
      type="danger"
    />
  );
};
