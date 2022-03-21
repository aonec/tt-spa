import React from 'react';
import { EditNodeCalculatorConnection } from './EditNodeCalculatorConnection';
import { useEvent, useStore } from 'effector-react';
import { outputs, inputs } from '../../displayNode/models';
import { inputs as removeNodeCalculatorConnectionInputs } from './components/RemoveConnectionConfirmModal/models';
import { useParams } from 'react-router-dom';
import { RemoveConnectionConfirmModalContainer } from './components/RemoveConnectionConfirmModal/RemoveConnectionConfirmModalContainer';
import ButtonTT from '../../../../tt-components/ButtonTT';
import { AddNodeCalculatorConnectionModalContainer } from './components/AddNodeCalculatorConnectionModal/AddNodeCalculatorConnectionModalContainer';
import { openAddNodeCalculatorConnectionModal } from './components/AddNodeCalculatorConnectionModal/models';

export const EditNodeCalculatorConnectionContainer = () => {
  const { $node } = outputs;
  const { NodeGate } = inputs;

  const node = useStore($node);

  const { nodeId } = useParams<{ nodeId: string }>();

  const { openConfirmationModal } = removeNodeCalculatorConnectionInputs;

  const addNodeCalculatorConnectionButtonClicked = useEvent(
    openAddNodeCalculatorConnectionModal
  );

  return (
    <>
      <RemoveConnectionConfirmModalContainer />
      <AddNodeCalculatorConnectionModalContainer />
      <NodeGate id={Number(nodeId)} />
      {node?.calculator ? (
        <EditNodeCalculatorConnection
          onEdit={() => {}}
          onRemoveConnection={openConfirmationModal}
          node={node}
        />
      ) : (
        <ButtonTT
          color="white"
          onClick={addNodeCalculatorConnectionButtonClicked}
        >
          + Подключить вычислитель
        </ButtonTT>
      )}
    </>
  );
};
