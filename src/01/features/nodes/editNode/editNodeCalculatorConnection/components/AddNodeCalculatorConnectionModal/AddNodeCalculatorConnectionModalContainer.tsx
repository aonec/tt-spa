import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { calculatorsService } from '../../../../../carlculators/calculators/models';
import { AddNodeCalculatorConnectionModal } from './AddNodeCalculatorConnectionModal';
import {
  $isAddNodeCalculatorConnectionModalOpen,
  addNodeCalculatorService,
} from './models';
import { nodeService } from '../../../../displayNode/models';
import { useForm } from 'effector-forms/dist';

export const AddNodeCalculatorConnectionModalContainer = () => {
  const closeModal = useEvent(
    addNodeCalculatorService.inputs.closeAddNodeCalculatorConnectionModal
  );
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
        node={node}
        loading={loading}
        form={addNodeCalculatorService.inputs.addNodeCalculatorConnectionForm}
        calculators={calculators}
        isOpen={isOpen}
        onClose={() => closeModal()}
      />
    </>
  );
};
