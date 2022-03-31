import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { nodeChecksService } from './models';
import { NodeChecks } from './NodeChecks/NodeChecks';

export const NodeChecksContainer = () => {
  const nodeChecks = useStore(nodeChecksService.outputs.$nodeChecks);
  const loading = useStore(nodeChecksService.outputs.$loading);

  const { NodeChecksGate } = nodeChecksService.inputs;

  const { nodeId } = useParams<{ nodeId: string }>();

  return (
    <>
      <NodeChecksGate NodeId={Number(nodeId)} />
      <NodeChecks
        documents={nodeChecks}
        pending={loading}
        removeApartmentCheck={() => {}}
        openCheckApartmentModal={() => {}}
        openEditApartmentCheckModal={() => {}}
      />
    </>
  );
};
