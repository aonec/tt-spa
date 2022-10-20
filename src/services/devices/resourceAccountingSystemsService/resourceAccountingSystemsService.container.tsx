import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router';
import { resourceAccountingSystemsService } from './resourceAccountingSystemsService.model';
import { ResourceAccountingSystems } from './view/ResourceAccountingSystems';

const { outputs, gates } = resourceAccountingSystemsService;

const { NodesGate } = gates;

export const ResourceAccountingSystemsContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const nodes = useStore(outputs.$nodes);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      {housingStockId && <NodesGate housingStockId={Number(housingStockId)} />}
      <ResourceAccountingSystems nodes={nodes} isLoading={isLoading} />
    </>
  );
};
