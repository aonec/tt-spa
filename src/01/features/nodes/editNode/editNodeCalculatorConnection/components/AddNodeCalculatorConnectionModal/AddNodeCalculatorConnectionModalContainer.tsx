import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { calculatorsService } from '../../../../../carlculators/calculators/models';
import { AddNodeCalculatorConnectionModal } from './AddNodeCalculatorConnectionModal';
import {
  $isAddNodeCalculatorConnectionModalOpen,
  closeAddNodeCalculatorConnectionModal,
} from './models';
import { nodeService } from '../../../../displayNode/models';

export const AddNodeCalculatorConnectionModalContainer = () => {
  const closeModal = useEvent(closeAddNodeCalculatorConnectionModal);
  const isOpen = useStore($isAddNodeCalculatorConnectionModalOpen);
  const node = useStore(nodeService.outputs.$node);

  const calculators = useStore(calculatorsService.outputs.$calculators);

  const { CalculatorsGate } = calculatorsService.inputs;

  return (
    <>
      {node && (
        <CalculatorsGate
          params={{ 'Filter.HousingStockId': node.housingStockId }}
        />
      )}
      <AddNodeCalculatorConnectionModal
        calculators={calculators || []}
        isOpen={isOpen}
        onClose={() => closeModal()}
      />
    </>
  );
};
