import AddNewZonesModal from '01/features/serviceZones/addServiceZone';
import { addServiceZoneButtonClicked } from '01/features/serviceZones/addServiceZone/models';
import ModalAddDevice from '01/_pages/EditNode/components/Modals/ModalAddDevice';
import { useEvent, useStore } from 'effector-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const openAddNewZonesModal = useEvent(addServiceZoneButtonClicked);
  const refetchNode = useEvent(inputs.refetchNode);
  const updateDocuments = useEvent(inputs.updateDocuments);

  return (
    <>
      <NodeIdGate nodeId={nodeId} />
      <AddNewZonesModal />

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
              updateDocuments={updateDocuments}
            />
          </>
        )}
      </WithLoader>
    </>
  );
};
