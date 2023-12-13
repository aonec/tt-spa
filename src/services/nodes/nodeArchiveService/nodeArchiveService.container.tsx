import { useUnit } from 'effector-react';
import React from 'react';
import { NodeArchivePage } from './view/NodeArchivePage';
import { nodeArchiveService } from './nodeArchiveService.models';
import { useParams } from 'react-router-dom';

export const NodeArchivePageContainer = () => {
  const { node } = useUnit({ node: nodeArchiveService.outputs.$node });

  const NodeGate = nodeArchiveService.inputs.NodeGate;

  const { nodeId } = useParams<{ nodeId: string }>();

  return (
    <>
      <NodeGate pipeNodeId={Number(nodeId)} />
      <NodeArchivePage node={node} />
    </>
  );
};
