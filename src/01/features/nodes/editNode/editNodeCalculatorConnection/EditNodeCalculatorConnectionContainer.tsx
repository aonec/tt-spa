import React, { FC } from 'react';
import { useEvent } from 'effector-react';
import { RemoveNodeCalculatorConnectionService } from './components/RemoveConnectionConfirmModal/RemoveConnectionConfirmModal.models';
import { RemoveConnectionConfirmModalContainer } from './components/RemoveConnectionConfirmModal/RemoveConnectionConfirmModalContainer';
import { AddNodeCalculatorConnectionModalContainer } from './components/AddNodeCalculatorConnectionModal/AddNodeCalculatorConnectionModalContainer';
import { addNodeCalculatorService } from './components/AddNodeCalculatorConnectionModal/AddNodeCalculatorConnectionModal.models';
import { Empty } from 'antd';
import { Button } from 'ui-kit/Button';
import { NodeConnection } from 'services/nodes/nodeProfileService/view/NodeProfilePage/NodeConnection';
import { EditNodeCalculatorConnectionContainerProps } from './EditNodeCalculatorConnection.types';

export const EditNodeCalculatorConnectionContainer: FC<
  EditNodeCalculatorConnectionContainerProps
> = ({ node }) => {
  const handleOpenConfirmModal = useEvent(
    RemoveNodeCalculatorConnectionService.inputs.openConfirmationModal,
  );
  const handleEdit = useEvent(
    addNodeCalculatorService.inputs.openAddNodeCalculatorConnectionModal,
  );

  const showCalculator = Boolean(node?.calculator);

  return (
    <>
      <RemoveConnectionConfirmModalContainer />
      <AddNodeCalculatorConnectionModalContainer />
      {showCalculator && (
        <NodeConnection
          onEdit={() => handleEdit()}
          onRemoveConnection={() => handleOpenConfirmModal()}
          node={node}
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
    </>
  );
};
