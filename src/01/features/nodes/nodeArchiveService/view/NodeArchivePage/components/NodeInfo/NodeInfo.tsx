import React, { FC } from 'react';
import { Wrap } from './NodeInfo.styled';
import { NodeInfoProps } from './NodeInfo.types';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

export const NodeInfo: FC<NodeInfoProps> = ({ node, loading }) => {
  const address = node?.address && getHousingStockAddress(node.address, true);
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!node) {
    return null;
  }

  return (
    <Wrap>
      <div>{address}</div>
      <ResourceIconLookup resource={node.resource} />
      <div>Узел {node.number}</div>
    </Wrap>
  );
};
