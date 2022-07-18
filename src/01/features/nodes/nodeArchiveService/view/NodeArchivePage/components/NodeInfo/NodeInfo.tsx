import { IconTT } from '01/tt-components';
import React, { FC } from 'react';
import { NodeName, Wrap } from './NodeInfo.styled';
import { NodeInfoProps } from './NodeInfo.types';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';

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
      {address}
      <IconTT style={{ marginLeft: 10 }} icon={node.resource.toLowerCase()} />
      <NodeName>Узел {node.entryNumber}</NodeName>
    </Wrap>
  );
};
