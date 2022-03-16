import React from 'react';
import { RemoveConnectionConfirmModal } from './RemoveConnectionConfirmModal';
import { outputs, inputs } from './models';
import { useStore } from 'effector-react';

export const RemoveConnectionConfirmModalContainer = () => {
  const { $isConfirmModalOpen } = outputs;

  const isConfirmModalOpen = useStore($isConfirmModalOpen);

  const { closeConfirmationModal } = inputs;

  return (
    <RemoveConnectionConfirmModal
      onClose={closeConfirmationModal}
      show={isConfirmModalOpen}
    />
  );
};
