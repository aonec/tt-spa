import React, { FC } from 'react';
import { NodeStatus } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  NodeLink,
  NodeNameWrapper,
  ServiceZoneText,
  Wrapper,
} from './RelatedNodesListItem.styled';
import { RelatedNodesListItemProps } from './RelatedNodesListItem.types';

export const RelatedNodesListItem: FC<RelatedNodesListItemProps> = ({
  node,
}) => {
  const { number, resource, id, nodeStatus, nodeServiceZone } = node;

  return (
    <Wrapper>
      <NodeNameWrapper>
        <ResourceIconLookup resource={resource} />
        <NodeLink to={`/nodes/${id}`}>Узел {number}</NodeLink>
      </NodeNameWrapper>
      {nodeStatus && <NodeStatus status={nodeStatus.value} />}
      <ServiceZoneText>{nodeServiceZone?.name || ''}</ServiceZoneText>
    </Wrapper>
  );
};
