import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { editNodeService } from './editNodeService.model';
import { EditNodePage } from './view/EditNodePage';

const { gates, inputs, outputs } = editNodeService;
const { NodeIdGate } = gates;

export const EditNodeContainer = () => {
  const { nodeId } = useParams<{ nodeId: string }>();

  const node = useStore(outputs.$node);
  const isLoading = useStore(outputs.$isLoading);
  const grouptype = useStore(outputs.$editNodeGrouptype);

  const setGrouptype = useEvent(inputs.setEditNodeGrouptype);

  return (
    <>
      <NodeIdGate nodeId={nodeId} />
      <WithLoader isLoading={isLoading}>
        {node && (
          <EditNodePage
            node={node}
            grouptype={grouptype}
            setGrouptype={setGrouptype}
          />
        )}
      </WithLoader>
    </>
  );
};
