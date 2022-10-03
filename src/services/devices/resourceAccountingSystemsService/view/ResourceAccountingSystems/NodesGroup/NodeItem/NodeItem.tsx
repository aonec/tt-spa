import React, { FC } from 'react';
import { CalculatorInfo } from '../CalculatorInfo';
import {
  NoCalculatorTextWrapper,
  NodeName,
  NodeServiceZone,
  NodeStatusWrapper,
  Wrapper,
} from './NodeItem.styled';
import { NodeItemProps } from './NodeItem.types';
import { NodeStatus } from './NodeStatus';

export const NodeItem: FC<NodeItemProps> = ({ node, segmentName }) => {
  return (
    <Wrapper>
      <div>
        <NodeName>Узел {node.number}</NodeName>
        <NodeServiceZone isZoneExist={Boolean(node.serviceZone?.name)}>
          {node.serviceZone?.name || 'Зона не указана'}
        </NodeServiceZone>
      </div>
      {node.networkDevice ? (
        <CalculatorInfo calculator={node.networkDevice} />
      ) : (
        <NoCalculatorTextWrapper>Нет вычислителя</NoCalculatorTextWrapper>
      )}
      <NodeStatusWrapper>
        <NodeStatus status={node.status} />
      </NodeStatusWrapper>
    </Wrapper>
  );
};
