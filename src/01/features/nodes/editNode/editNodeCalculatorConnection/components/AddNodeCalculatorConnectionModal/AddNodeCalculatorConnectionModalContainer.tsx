import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { AddNodeCalculatorConnectionModal } from './AddNodeCalculatorConnectionModal';
import {
  $isAddNodeCalculatorConnectionModalOpen,
  closeAddNodeCalculatorConnectionModal,
} from './models';
import { CreateCalculatorModalContainer } from './CreateCalculatorModal/CreateCalculatorModalContainer';

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
