import React from 'react';
import { useUnit } from 'effector-react';
import { ConfirmReadingModal } from './view/ConfirmReadingModal';
import { confirmReadingService } from './confirmReadingService.model';

const { inputs, outputs } = confirmReadingService;

export const ConfirmReadingValueContainer: React.FC = () => {
  const { isOpen, title, executeConfirmReading, executeCancelReading } =
    useUnit({
      isOpen: outputs.$isConfirmReadingInputModalOpen,
      title: outputs.$confirmModalTitle,
      executeConfirmReading: inputs.executeConfirmReadingCallback,
      executeCancelReading: inputs.executeCancelReadingCallback,
    });

  return (
    <ConfirmReadingModal
      title={title}
      isOpen={isOpen}
      executeConfirmReading={executeConfirmReading}
      executeCancelReading={executeCancelReading}
    />
  );
};
