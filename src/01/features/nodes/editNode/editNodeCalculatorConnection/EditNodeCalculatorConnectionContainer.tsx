import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { outputs, inputs, nodeService } from '../../displayNode/models';
import { RemoveNodeCalculatorConnectionService } from './components/RemoveConnectionConfirmModal/models';
import { useParams } from 'react-router-dom';
import { RemoveConnectionConfirmModalContainer } from './components/RemoveConnectionConfirmModal/RemoveConnectionConfirmModalContainer';
import ButtonTT from '../../../../tt-components/ButtonTT';
import { AddNodeCalculatorConnectionModalContainer } from './components/AddNodeCalculatorConnectionModal/AddNodeCalculatorConnectionModalContainer';
import { addNodeCalculatorService } from './components/AddNodeCalculatorConnectionModal/models';
import { Loader } from '../../../../components/Loader';
import NodeConnection from "../../../../tt-components/NodeConnection";

export const EditNodeCalculatorConnectionContainer = () => {
  const { NodeGate } = inputs;

  const node = useStore(outputs.$node);
  const loading = useStore(nodeService.outputs.$loading);

  const handleOpenConfirmModal = useEvent(RemoveNodeCalculatorConnectionService.inputs.openConfirmationModal);
  const handleEdit = useEvent(addNodeCalculatorService.inputs.openAddNodeCalculatorConnectionModal)

  const { nodeId } = useParams<{ nodeId: string }>();

  const showCalculator = Boolean(node?.calculator);

  return (
    <>
      <RemoveConnectionConfirmModalContainer />
      <AddNodeCalculatorConnectionModalContainer />
      <NodeGate id={Number(nodeId)} />
        {loading && <Loader show />}
        {!loading && showCalculator && (
          <NodeConnection
            onEdit={() => handleEdit()}
            onRemoveConnection={() => handleOpenConfirmModal()}
            node={node!}
            edit
          />
        )}
      {!loading && !showCalculator && (
        <ButtonTT
          color="white"
          onClick={() => handleEdit()}
          type={"button"}
        >
          + Подключить вычислитель
        </ButtonTT>
      )}
    </>
  );
};
