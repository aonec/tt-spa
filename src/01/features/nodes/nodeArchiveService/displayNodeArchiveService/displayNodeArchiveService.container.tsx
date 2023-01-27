import { useStore } from 'effector-react';
import React from 'react';
import { displayNodeArchiveService } from './displayNodeArchiveService.models';
import { NodeArchiveList } from './view/NodeArchiveList';

export const NodeArchiveContainer = () => {
  const nodeArchiveData = useStore(
    displayNodeArchiveService.outputs.$nodeArchiveData,
  );
  const loading = useStore(displayNodeArchiveService.outputs.$loading);

  const { NodeArchiveGate } = displayNodeArchiveService.inputs;

  return (
    <>
      <NodeArchiveGate />
      <NodeArchiveList data={nodeArchiveData} loading={loading} />
    </>
  );
};
