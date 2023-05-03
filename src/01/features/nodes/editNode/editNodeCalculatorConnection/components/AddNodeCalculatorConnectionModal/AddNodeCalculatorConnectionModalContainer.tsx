import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { AddNodeCalculatorConnectionModal } from './AddNodeCalculatorConnectionModal';
import {
  $isAddNodeCalculatorConnectionModalOpen,
  addNodeCalculatorService,
} from './AddNodeCalculatorConnectionModal.models';
import { calculatorsListService } from 'services/calculators/calculatorsListService';
import { editNodeService } from 'services/nodes/editNodeService';
import { createCalcuatorService } from './CreateCalculatorModal/models';
import { CreateCalculatorModalContainer } from './CreateCalculatorModal/CreateCalculatorModalContainer';

export const AddNodeCalculatorConnectionModalContainer = () => {
  const closeModal = useEvent(
    addNodeCalculatorService.inputs.closeAddNodeCalculatorConnectionModal,
  );
  const openCreateCalculatorModal = useEvent(
    createCalcuatorService.inputs.openCreateCalculatorModal,
  );
  const isOpen = useStore($isAddNodeCalculatorConnectionModalOpen);
  const node = useStore(editNodeService.outputs.$node);

  const calculators = useStore(calculatorsListService.outputs.$calculatorsList);

  const { CalculatorsGate } = calculatorsListService.gates;

  const loading = useStore(addNodeCalculatorService.outputs.$loading);

  return (
    <>
      {node && <CalculatorsGate housingStockId={node.housingStockId} />}
      <CreateCalculatorModalContainer />
      <AddNodeCalculatorConnectionModal
        node={node}
        loading={loading}
        form={addNodeCalculatorService.inputs.addNodeCalculatorConnectionForm}
        calculators={calculators}
        isOpen={isOpen}
        onClose={() => closeModal()}
        openCreateCalculatorModal={openCreateCalculatorModal}
      />
    </>
  );
};
