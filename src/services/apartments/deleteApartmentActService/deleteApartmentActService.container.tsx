import { useUnit } from 'effector-react';
import React from 'react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { deleteApartmentActService } from './deleteApartmentActService.models';

const { inputs, outputs } = deleteApartmentActService;

export const DeleteApartmentActModalContainer = () => {
  const { handleClose, handleSubmit, isLoading, isOpen } = useUnit({
    isOpen: outputs.$isModalOpen,
    isLoading: outputs.$deleteActIsLoading,
    handleClose: inputs.closeModal,
    handleSubmit: inputs.deleteAct,
  });

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
