import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckNodeModalContainer } from '../checkNode/CheckNodeModalContainer';
import { checkNodeService } from '../checkNode/models';
import { nodeChecksService } from './models';
import { NodeChecks } from './NodeChecks/NodeChecks';

export const NodeChecksContainer = () => {
  const nodeChecks = useStore(nodeChecksService.outputs.$nodeChecks);
  const loading = useStore(nodeChecksService.outputs.$loading);

  const { NodeChecksGate } = nodeChecksService.inputs;

  const params = useParams<{ nodeId: string }>();

  const { nodeId } = params;

  return (
    <>
      <NodeChecksGate NodeId={Number(nodeId)} />
      <CheckNodeModalContainer />
      <NodeChecks
        documents={nodeChecks}
        pending={loading}
        removeApartmentCheck={() => {}}
        openCheckApartmentModal={checkNodeService.inputs.openCheckNodeModal}
        openEditApartmentCheckModal={
          checkNodeService.inputs.openEditNodeCheckModal
        }
      />
    </>
  );
};
