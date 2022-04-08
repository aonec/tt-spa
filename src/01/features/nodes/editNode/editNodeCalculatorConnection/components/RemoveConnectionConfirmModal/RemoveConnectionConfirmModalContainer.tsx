import React from 'react';
import { RemoveConnectionConfirmModal } from './RemoveConnectionConfirmModal';
import { outputs, inputs } from './models';
import { useStore } from 'effector-react';

export const RemoveConnectionConfirmModalContainer = () => {
  const { $isConfirmModalOpen, $loading } = outputs;

  const isConfirmModalOpen = useStore($isConfirmModalOpen);
  const loading = useStore($loading);

  const { closeConfirmationModal, removeConnectionButtonClicked } = inputs;

  return (
    <RemoveConnectionConfirmModal
      loading={loading}
      onClose={closeConfirmationModal}
      show={isConfirmModalOpen}
      onRemove={removeConnectionButtonClicked}
    />
  );
};
