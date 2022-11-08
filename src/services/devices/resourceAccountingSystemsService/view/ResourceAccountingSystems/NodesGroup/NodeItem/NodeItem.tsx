import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DeviceIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { CalculatorInfo } from '../CalculatorInfo';
import {
  DeviceIconWrapper,
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

export const NodeItem: FC<NodeItemProps> = ({
  node,
  segmentName,
  openDevicesListModal,
}) => {
  const content = useMemo(() => {
    const nodeInfo = (
      <Link to={`/nodes/${node.id}`}>
        <NodeName>Узел {node.number}</NodeName>
        <NodeServiceZone isZoneExist={Boolean(node.serviceZone?.name)}>
          {node.serviceZone?.name || 'Зона не указана'}
        </NodeServiceZone>
      </Link>
    );

    if (segmentName === 'resource')
      return (
        <>
          <div>{nodeInfo}</div>
          {node.networkDevice ? (
            <CalculatorInfo calculator={node.networkDevice} />
          ) : (
            <NoCalculatorTextWrapper>Нет вычислителя</NoCalculatorTextWrapper>
          )}
        </>
      );

    if (segmentName === 'calculator')
      return (
        <>
          <NodeInfoWrapper>
            <ResourceIconLookup
              style={{ transform: 'translateY(-8px)' }}
              resource={node.resource}
            />
            <NodeInfo>{nodeInfo}</NodeInfo>
          </NodeInfoWrapper>
        </>
      );
  }, [segmentName, node]);

  return (
    <Wrapper segmentName={segmentName}>
      {content}
      <NodeStatusWrapper>
        <NodeStatus status={node.status} />
        <DeviceIconWrapper>
          <DeviceIcon onClick={() => openDevicesListModal(node.id)} />
        </DeviceIconWrapper>
      </NodeStatusWrapper>
    </Wrapper>
  );
};
