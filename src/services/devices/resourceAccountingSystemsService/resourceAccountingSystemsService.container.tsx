import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router';
import { resourceAccountingSystemsService } from './resourceAccountingSystemsService.model';
import { ResourceAccountingSystems } from './view/ResourceAccountingSystems';
import { MeteringDevicesContainer } from './view/ResourceAccountingSystems/meteringDevicesService';

const { inputs, outputs, gates } = resourceAccountingSystemsService;

const { NodesGate } = gates;

export const ResourceAccountingSystemsContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const nodes = useStore(outputs.$nodes);
  const isLoading = useStore(outputs.$isLoading);

  const openDevicesListModal = useEvent(inputs.openDevicesListModal);

  return (
    <>
      <MeteringDevicesContainer />
      {housingStockId && <NodesGate housingStockId={Number(housingStockId)} />}
      <ResourceAccountingSystems
        openDevicesListModal={openDevicesListModal}
        nodes={nodes}
        isLoading={isLoading}
      />
    </>
  );
};
