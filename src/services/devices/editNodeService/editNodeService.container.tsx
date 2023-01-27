import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  CreateNodeServiceZoneContainer,
  createNodeServiceZoneService,
} from 'services/nodes/createNodeServiceZoneService';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { editNodeService } from './editNodeService.model';
import { EditNodePage } from './view/EditNodePage';

const { gates, inputs, outputs } = editNodeService;
const { NodeIdGate, NodeResourceGate } = gates;

export const EditNodeContainer = () => {
  const { nodeId } = useParams<{ nodeId: string }>();

  const node = useStore(outputs.$node);
  const isLoading = useStore(outputs.$isLoading);
  const grouptype = useStore(outputs.$editNodeGrouptype);
  const nodeZones = useStore(outputs.$nodeZones);
  const magistrals = useStore(outputs.$magistrals);

  const setGrouptype = useEvent(inputs.setEditNodeGrouptype);
  const openAddNewZonesModal = useEvent(
    createNodeServiceZoneService.inputs.openCreateNodeServiceZoneModal,
  );

  const refetchNode = useEvent(inputs.refetchNode);
  const updateNode = useEvent(inputs.updateNode);

  return (
    <>
      <NodeIdGate nodeId={nodeId} />
      <CreateNodeServiceZoneContainer />

      <WithLoader isLoading={isLoading}>
        {node && (
          <>
            <NodeResourceGate resource={node.resource} />
            <EditNodePage
              node={node}
              grouptype={grouptype}
              setGrouptype={setGrouptype}
              openAddNewZonesModal={() => openAddNewZonesModal()}
              nodeZones={nodeZones}
              magistrals={magistrals}
              refetchNode={() => refetchNode()}
              updateNode={updateNode}
            />
          </>
        )}
      </WithLoader>
    </>
  );
};
