import { ModalTT } from '01/shared/ui/ModalTT';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { deleteApartmentActService } from './deleteApartmentActService.models';

export const DeleteApartmentActContainer = () => {
  const { inputs, outputs } = deleteApartmentActService;

  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$deleteActIsLoading);

  const handleClose = useEvent(inputs.closeModal);
  const handleSubmit = useEvent(inputs.deleteAct);

  return (
    <ModalTT
      loading={isLoading}
      title="Вы действительно хотите удалить акт?"
      visible={isOpen}
      onCancel={() => handleClose()}
      onSubmit={() => handleSubmit()}
      saveButtonType="red"
      saveBtnText="Удалить документ"
    />
  );
};
