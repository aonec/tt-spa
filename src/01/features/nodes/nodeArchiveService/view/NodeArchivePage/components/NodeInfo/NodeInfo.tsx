import { IconTT } from '01/tt-components';
import React, { FC } from 'react';
import { NodeName, Wrap } from './NodeInfo.styled';
import { NodeInfoProps } from './NodeInfo.types';
import { getHousingStockAddressString } from './utils';
import { LoadingSkeleton } from './components/LoadingSkeleton';

export const NodeInfo: FC<NodeInfoProps> = ({ node, loading }) => {
  console.log(node?.address)
  const address = node?.address && getHousingStockAddressString(node.address);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!node) {
    return null;
  }

  return (
    <Wrap>
      {address}
      <IconTT style={{ marginLeft: 10 }} icon={node.resource.toLowerCase()} />
      <NodeName>Узел {node.entryNumber}</NodeName>
    </Wrap>
  );
};
