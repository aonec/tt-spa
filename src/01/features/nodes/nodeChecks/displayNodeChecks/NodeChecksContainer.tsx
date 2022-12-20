import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckNodeModalContainer } from '../checkNode/CheckNodeModalContainer';
import { checkNodeService } from '../checkNode/models';
import { nodeChecksService } from './models';
import { NodeChecks } from './NodeChecks/NodeChecks';
import { Props } from './types';

export const NodeChecksContainer: React.FC<Props> = ({ pipeNodeId }) => {
  const nodeChecks = useStore(nodeChecksService.outputs.$nodeChecks);
  const loading = useStore(nodeChecksService.outputs.$loading);

  const { NodeChecksGate } = nodeChecksService.inputs;
  const params = useParams<{ nodeId: string }>();

  const { nodeId } = params;

  return (
    <>
      <NodeChecksGate NodeId={Number(pipeNodeId || nodeId)} />
      <CheckNodeModalContainer />
      <NodeChecks
        documents={nodeChecks}
        pending={loading}
        removeNodeCheck={checkNodeService.inputs.removeNodeCheckEv}
        openCheckNodeModal={checkNodeService.inputs.openCheckNodeModal}
        openEditNodeCheckModal={checkNodeService.inputs.openEditNodeCheckModal}
      />
    </>
  );
};
