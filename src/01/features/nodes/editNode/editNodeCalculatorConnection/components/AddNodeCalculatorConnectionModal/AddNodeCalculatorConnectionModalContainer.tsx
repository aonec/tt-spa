import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { AddNodeCalculatorConnectionModal } from './AddNodeCalculatorConnectionModal';
import {
  $isAddNodeCalculatorConnectionModalOpen,
  closeAddNodeCalculatorConnectionModal,
} from './models';

export const AddNodeCalculatorConnectionModalContainer = () => {
  const closeModal = useEvent(closeAddNodeCalculatorConnectionModal);
  const isOpen = useStore($isAddNodeCalculatorConnectionModalOpen);

  return (
    <>
      <AddNodeCalculatorConnectionModal
        isOpen={isOpen}
        onClose={() => closeModal()}
      />
    </>
  );
};
