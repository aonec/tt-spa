import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { outputs, inputs, nodeService } from '../../displayNode/models';
import { RemoveNodeCalculatorConnectionService } from './components/RemoveConnectionConfirmModal/models';
import { useParams } from 'react-router-dom';
import { RemoveConnectionConfirmModalContainer } from './components/RemoveConnectionConfirmModal/RemoveConnectionConfirmModalContainer';
import { AddNodeCalculatorConnectionModalContainer } from './components/AddNodeCalculatorConnectionModal/AddNodeCalculatorConnectionModalContainer';
import { addNodeCalculatorService } from './components/AddNodeCalculatorConnectionModal/models';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Empty } from 'antd';
import { Button } from 'ui-kit/Button';
import { NodeConnection } from 'services/nodes/nodeProfileService/view/NodeProfilePage/NodeConnection';
import { calculatorsListService } from 'services/calculators/calculatorsListService';

export const EditNodeCalculatorConnectionContainer = () => {
  const { nodeId } = useParams<{ nodeId: string }>();

  const { NodeGate } = inputs;
  const node = useStore(outputs.$node);
  const loading = useStore(nodeService.outputs.$loading);

  const handleOpenConfirmModal = useEvent(
    RemoveNodeCalculatorConnectionService.inputs.openConfirmationModal,
  );
  const handleEdit = useEvent(
    addNodeCalculatorService.inputs.openAddNodeCalculatorConnectionModal,
  );

  const showCalculator = Boolean(node?.calculator);

  const { CalculatorsGate } = calculatorsListService.gates;

  return (
    <>
      {node && <CalculatorsGate housingStockId={node.housingStockId} />}
      <RemoveConnectionConfirmModalContainer />
      <AddNodeCalculatorConnectionModalContainer />
      <NodeGate id={Number(nodeId)} />
      <WithLoader isLoading={loading}>
        {showCalculator && (
          <NodeConnection
            onEdit={() => handleEdit()}
            onRemoveConnection={() => handleOpenConfirmModal()}
            node={node!}
          />
        )}
        {!showCalculator && (
          <>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="К узлу не подключен вычислитель"
            />
            <Button type="ghost" onClick={() => handleEdit()}>
              + Подключить вычислитель
            </Button>
          </>
        )}
      </WithLoader>
    </>
  );
};
