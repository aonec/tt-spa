import React, { FC } from 'react';
import { Wrap } from './NodeInfo.styled';
import { NodeInfoProps } from './NodeInfo.types';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

export const NodeInfo: FC<NodeInfoProps> = ({ node }) => {
  const address = node?.address && getHousingStockAddress(node.address, true);

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
