import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router';
import { resourceAccountingSystemsService } from './resourceAccountingSystemsService.model';
import { ResourceAccountingSystems } from './view/ResourceAccountingSystems';

const { outputs, gates } = resourceAccountingSystemsService;

const { NodesGate } = gates;

export const ResourceAccountingSystemsContainer = () => {
  const { id } = useParams<{ id: string }>();

  const nodes = useStore(outputs.$nodes);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      {id && <NodesGate housingStockId={Number(id)} />}
      <ResourceAccountingSystems nodes={nodes} isLoading={isLoading} />
    </>
  );
};
