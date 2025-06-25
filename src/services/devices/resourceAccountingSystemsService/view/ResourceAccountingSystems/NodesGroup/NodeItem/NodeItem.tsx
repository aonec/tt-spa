import { Tooltip } from 'ui-kit/shared/Tooltip';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DeviceIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { CalculatorInfo } from '../CalculatorInfo';
import {
  BaseNodeInfo,
  Container,
  DeviceIconWrapper,
  IncorrectConfigurationIconSC,
  NoCalculatorTextWrapper,
  NodeInfo,
  NodeInfoWrapper,
  NodeName,
  NodeServiceZone,
  NodeStatusWrapper,
  NodeZoneWrapper,
  ResourceIconWrapper,
  Wrapper,
  ZoneWrapper,
} from './NodeItem.styled';
import { NodeItemProps } from './NodeItem.types';
import { NodeStatus } from './NodeStatus';

export const NodeItem: FC<NodeItemProps> = ({
  node,
  segmentName,
  openDevicesListModal,
}) => {
  const content = useMemo(() => {
    const isIncorrectConfig =
      node?.pipeNodeValidationStatus?.validationResult?.errors?.length !== 0 ||
      node?.pipeNodeValidationStatus?.validationResult?.warnings?.length !== 0;

    const nodeInfo = (
      <BaseNodeInfo>
        <Link to={`/nodes/${node.id}`}>
          <NodeZoneWrapper>
            <NodeName>
              {node.serviceZone?.name || 'Зона не указана'}
              {isIncorrectConfig && <IncorrectConfigurationIconSC />}{' '}
            </NodeName>
            <NodeServiceZone isZoneExist={Boolean(node.serviceZone?.name)}>
              <ZoneWrapper>
                Узел {node.title}
                {node.entryNumber && `, Ввод ${node.entryNumber}`}
              </ZoneWrapper>
            </NodeServiceZone>
          </NodeZoneWrapper>
        </Link>
      </BaseNodeInfo>
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
            <ResourceIconWrapper>
              <ResourceIconLookup resource={node.resource} />
            </ResourceIconWrapper>
            <NodeInfo>{nodeInfo}</NodeInfo>
          </NodeInfoWrapper>
        </>
      );
  }, [segmentName, node, openDevicesListModal]);

  return (
    <Container>
      <Wrapper segmentName={segmentName}>
        {content}
        <NodeStatusWrapper>
          <NodeStatus status={node.status} />
        </NodeStatusWrapper>

        <Tooltip title="Показать приборы">
          <DeviceIconWrapper>
            <DeviceIcon onClick={() => openDevicesListModal(node)} />
          </DeviceIconWrapper>
        </Tooltip>
      </Wrapper>
    </Container>
  );
};
