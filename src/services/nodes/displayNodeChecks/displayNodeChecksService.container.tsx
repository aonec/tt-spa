import { useUnit } from 'effector-react';
import React from 'react';
import { NodeChecks } from './NodeChecks/NodeChecks';
import { DisplayNodeChecksContainerProps } from './displayNodeChecksService.types';
import { displayNodeChecksService } from './displayNodeChecksService.models';
import {
  RemoveNodeCheckContainer,
  removeNodeCheckService,
} from '../removeNodeCheckService';
import {
  CreateNodeCheckContainer,
  createNodeCheckService,
} from '../createNodeCheckService';
import {
  EditNodeCheckContainer,
  editNodeCheckService,
} from '../editNodeCheckService';
import './displayNodeChecksService.relations';

const { gates, outputs } = displayNodeChecksService;
const { NodeChecksGate } = gates;

export const DisplayNodeChecksContainer: React.FC<
  DisplayNodeChecksContainerProps
> = ({ pipeNodeId }) => {
  const {
    handleOpenCreateNodeCheckModal,
    handleOpenEditNodeCheckModal,
    handleOpenRemoveNodeCheckModal,
    isLoading,
    nodeChecks,
  } = useUnit({
    nodeChecks: outputs.$nodeChecks,
    isLoading: outputs.$loading,
    handleOpenRemoveNodeCheckModal: removeNodeCheckService.inputs.openModal,
    handleOpenCreateNodeCheckModal: createNodeCheckService.inputs.openModal,
    handleOpenEditNodeCheckModal: editNodeCheckService.inputs.openModal,
  });

  return (
    <>
      <NodeChecksGate nodeId={pipeNodeId} />
      <EditNodeCheckContainer />
      <CreateNodeCheckContainer />
      <RemoveNodeCheckContainer />
      <NodeChecks
        documents={nodeChecks}
        isLoading={isLoading}
        removeNodeCheck={(checkId) =>
          handleOpenRemoveNodeCheckModal({ nodeId: pipeNodeId, checkId })
        }
        openCheckNodeModal={() => handleOpenCreateNodeCheckModal(pipeNodeId)}
        openEditNodeCheckModal={(nodeCheck) =>
          handleOpenEditNodeCheckModal({ nodeId: pipeNodeId, ...nodeCheck })
        }
      />
    </>
  );
};
