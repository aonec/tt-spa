import React, { FC } from 'react';
import { Wrap } from './NodeInfo.styled';
import { NodeInfoProps } from './NodeInfo.types';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { ResourceIconLookup } from 'ui-kit/sharedComponents/ResourceIconLookup';

export const NodeInfo: FC<NodeInfoProps> = ({ node }) => {
  const address = node?.address && getBuildingAddress(node.address, true);

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
