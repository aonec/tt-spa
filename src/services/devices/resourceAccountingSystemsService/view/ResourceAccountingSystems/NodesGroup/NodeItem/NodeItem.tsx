import { Tooltip } from 'ui-kit/shared/Tooltip';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DeviceIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { CalculatorInfo } from '../CalculatorInfo';
import {
  BaseNodeInfo,
  DeviceIconWrapper,
  IncorrectConfigurationIconSC,
  NoCalculatorTextWrapper,
  NodeEntryNumber,
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
              Узел {node.title}
              {isIncorrectConfig && <IncorrectConfigurationIconSC />}{' '}
              <NodeEntryNumber>
                {node.entryNumber && `Ввод ${node.entryNumber}`}
              </NodeEntryNumber>
            </NodeName>
            <NodeServiceZone isZoneExist={Boolean(node.serviceZone?.name)}>
              <ZoneWrapper>
                {node.serviceZone?.name || 'Зона не указана'}
              </ZoneWrapper>
            </NodeServiceZone>
          </NodeZoneWrapper>
        </Link>
        <Tooltip title="Показать приборы">
          <DeviceIconWrapper>
            <DeviceIcon onClick={() => openDevicesListModal(node)} />
          </DeviceIconWrapper>
        </Tooltip>
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
    <Wrapper segmentName={segmentName}>
      {content}
      <NodeStatusWrapper>
        <NodeStatus status={node.status} />
      </NodeStatusWrapper>
    </Wrapper>
  );
};
