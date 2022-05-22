import { useStore } from 'effector-react';
import React from 'react';
import { NodeArchivePage } from './view/NodeArchivePage';
import { nodeArchiveService } from './nodeArchiveService.models';
import { useParams } from 'react-router-dom';

export const NodeArchivePageContainer = () => {
  const node = useStore(nodeArchiveService.outputs.$node);
  const loading = useStore(nodeArchiveService.outputs.$loadingNode);

  const NodeGate = nodeArchiveService.inputs.NodeGate;

  const { nodeId } = useParams<{ nodeId: string }>();

  return (
    <>
      <NodeGate id={Number(nodeId)} />
      <NodeArchivePage node={node} loading={loading} />
    </>
  );
};
