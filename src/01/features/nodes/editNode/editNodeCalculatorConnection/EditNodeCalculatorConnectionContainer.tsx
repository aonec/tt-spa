import React from 'react';
import { EditNodeCalculatorConnection } from './EditNodeCalculatorConnection';
import { useStore } from 'effector-react';
import { outputs, inputs } from '../../displayNode/models';
import { inputs as removeNodeCalculatorConnectionInputs } from './components/RemoveConnectionConfirmModal/models';
import { useParams } from 'react-router-dom';
import { RemoveConnectionConfirmModalContainer } from './components/RemoveConnectionConfirmModal/RemoveConnectionConfirmModalContainer';

export const EditNodeCalculatorConnectionContainer = () => {
  const { $node } = outputs;
  const { NodeGate } = inputs;

  const node = useStore($node);

  const { nodeId } = useParams<{ nodeId: string }>();

  const { openConfirmationModal } = removeNodeCalculatorConnectionInputs;

  return (
    <>
      <RemoveConnectionConfirmModalContainer />
      <NodeGate id={Number(nodeId)} />
      {node ? (
        <EditNodeCalculatorConnection
          onEdit={() => {}}
          onRemoveConnection={openConfirmationModal}
          node={node}
        />
      ) : null}
    </>
  );
};
