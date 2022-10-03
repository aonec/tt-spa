import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { CalculatorInfo } from '../CalculatorInfo';
import {
  NoCalculatorTextWrapper,
  NodeInfo,
  NodeInfoWrapper,
  NodeName,
  NodeServiceZone,
  NodeStatusWrapper,
  Wrapper,
} from './NodeItem.styled';
import { NodeItemProps } from './NodeItem.types';
import { NodeStatus } from './NodeStatus';

export const NodeItem: FC<NodeItemProps> = ({ node, segmentName }) => {
  const nodeInfo = (
    <>
      <NodeName>Узел {node.number}</NodeName>
      <NodeServiceZone isZoneExist={Boolean(node.serviceZone?.name)}>
        {node.serviceZone?.name || 'Зона не указана'}
      </NodeServiceZone>
    </>
  );

  return (
    <Wrapper segmentName={segmentName}>
      {segmentName === 'resource' && <div>{nodeInfo}</div>}
      {segmentName === 'calculator' && (
        <NodeInfoWrapper>
          <ResourceIconLookup resource={node.resource} />
          <NodeInfo>{nodeInfo}</NodeInfo>
        </NodeInfoWrapper>
      )}
      {segmentName === 'resource' && (
        <>
          {node.networkDevice ? (
            <CalculatorInfo calculator={node.networkDevice} />
          ) : (
            <NoCalculatorTextWrapper>Нет вычислителя</NoCalculatorTextWrapper>
          )}
        </>
      )}
      <NodeStatusWrapper>
        <NodeStatus status={node.status} />
      </NodeStatusWrapper>
    </Wrapper>
  );
};
