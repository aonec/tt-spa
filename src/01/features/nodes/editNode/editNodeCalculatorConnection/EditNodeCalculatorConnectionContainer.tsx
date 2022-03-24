import React from 'react';
import { EditNodeCalculatorConnection } from './EditNodeCalculatorConnection';
import { useEvent, useStore } from 'effector-react';
import { outputs, inputs, nodeService } from '../../displayNode/models';
import { inputs as removeNodeCalculatorConnectionInputs } from './components/RemoveConnectionConfirmModal/models';
import { useParams } from 'react-router-dom';
import { RemoveConnectionConfirmModalContainer } from './components/RemoveConnectionConfirmModal/RemoveConnectionConfirmModalContainer';
import ButtonTT from '../../../../tt-components/ButtonTT';
import { AddNodeCalculatorConnectionModalContainer } from './components/AddNodeCalculatorConnectionModal/AddNodeCalculatorConnectionModalContainer';
import { openAddNodeCalculatorConnectionModal } from './components/AddNodeCalculatorConnectionModal/models';
import { Loader } from '../../../../components/Loader';

export const EditNodeCalculatorConnectionContainer = () => {
  const { $node } = outputs;
  const { NodeGate } = inputs;

  const node = useStore($node);

  const { nodeId } = useParams<{ nodeId: string }>();

  const { openConfirmationModal } = removeNodeCalculatorConnectionInputs;

  const addNodeCalculatorConnectionButtonClicked = useEvent(
    openAddNodeCalculatorConnectionModal
  );

  const loading = useStore(nodeService.outputs.$loading);

  return (
    <>
      <RemoveConnectionConfirmModalContainer />
      <AddNodeCalculatorConnectionModalContainer />
      <NodeGate id={Number(nodeId)} />
      {loading ? (
        <Loader show />
      ) : (
        <>
          {node?.calculator ? (
            <EditNodeCalculatorConnection
              onEdit={() => {}}
              onRemoveConnection={openConfirmationModal}
              node={node}
            />
          ) : (
            <ButtonTT
              color="white"
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
                addNodeCalculatorConnectionButtonClicked();
              }}
            >
              + Подключить вычислитель
            </ButtonTT>
          )}
        </>
      )}
    </>
  );
};
