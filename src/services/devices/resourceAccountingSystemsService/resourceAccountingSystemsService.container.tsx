import { useUnit } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router';
import { resourceAccountingSystemsService } from './resourceAccountingSystemsService.model';
import { ResourceAccountingSystems } from './view/ResourceAccountingSystems';
import { MeteringDevicesContainer } from './view/ResourceAccountingSystems/meteringDevicesService';

const { inputs, outputs, gates } = resourceAccountingSystemsService;

const { NodesGate } = gates;

export const ResourceAccountingSystemsContainer = () => {
  const { buildingId } = useParams<{ buildingId: string }>();
  const { isLoading, nodes, openDevicesListModal } = useUnit({
    nodes: outputs.$nodes,
    isLoading: outputs.$isLoading,
    openDevicesListModal: inputs.openDevicesListModal,
  });

  return (
    <>
      <MeteringDevicesContainer />
      {buildingId && <NodesGate buildingId={Number(buildingId)} />}
      <ResourceAccountingSystems
        openDevicesListModal={openDevicesListModal}
        nodes={nodes}
        isLoading={isLoading}
      />
    </>
  );
};
