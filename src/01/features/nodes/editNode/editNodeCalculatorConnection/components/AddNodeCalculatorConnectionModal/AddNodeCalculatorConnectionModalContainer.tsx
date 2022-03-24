import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { calculatorsService } from '../../../../../carlculators/calculators/models';
import { AddNodeCalculatorConnectionModal } from './AddNodeCalculatorConnectionModal';
import {
  $isAddNodeCalculatorConnectionModalOpen,
  addNodeCalculatorConnectionForm,
  addNodeCalculatorService,
  closeAddNodeCalculatorConnectionModal,
} from './models';
import { nodeService } from '../../../../displayNode/models';
import { useForm } from 'effector-forms/dist';

export const AddNodeCalculatorConnectionModalContainer = () => {
  const closeModal = useEvent(closeAddNodeCalculatorConnectionModal);
  const isOpen = useStore($isAddNodeCalculatorConnectionModalOpen);
  const node = useStore(nodeService.outputs.$node);

  const calculators = useStore(calculatorsService.outputs.$calculators);

  const { CalculatorsGate } = calculatorsService.inputs;

  const loading = useStore(addNodeCalculatorService.outputs.$loading);

  return (
    <>
      {node && (
        <CalculatorsGate
          params={{ 'Filter.HousingStockId': node.housingStockId }}
        />
      )}
      <AddNodeCalculatorConnectionModal
        loading={loading}
        form={addNodeCalculatorConnectionForm}
        calculators={calculators}
        isOpen={isOpen}
        onClose={() => closeModal()}
      />
    </>
  );
};
