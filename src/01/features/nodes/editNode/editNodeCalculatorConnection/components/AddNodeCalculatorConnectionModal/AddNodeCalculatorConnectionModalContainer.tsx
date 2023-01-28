import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { calculatorsIntoHousingStockService } from '../../../../../carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.model';
import { AddNodeCalculatorConnectionModal } from './AddNodeCalculatorConnectionModal';
import {
  $isAddNodeCalculatorConnectionModalOpen,
  addNodeCalculatorService,
} from './models';
import { nodeService } from '../../../../displayNode/models';

export const AddNodeCalculatorConnectionModalContainer = () => {
  const closeModal = useEvent(
    addNodeCalculatorService.inputs.closeAddNodeCalculatorConnectionModal
  );
  const isOpen = useStore($isAddNodeCalculatorConnectionModalOpen);
  const node = useStore(nodeService.outputs.$node);

  const calculators = useStore(calculatorsIntoHousingStockService.outputs.$calculators);

  const { CalculatorsGate } = calculatorsIntoHousingStockService.inputs;

  const loading = useStore(addNodeCalculatorService.outputs.$loading);

  return (
    <>
      {node && <CalculatorsGate housingStockId={node.housingStockId} />}
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
