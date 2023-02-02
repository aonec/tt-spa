import React, { FC } from 'react';
import {
  AdditionalInfo,
  BaseNodeInfo,
  DeviceIconWrapper,
  NodeInfo,
  NodeInfoWrapper,
  NodeName,
  NodeStatusWrapper,
  ResourceIconWrapper,
  Wrapper,
} from './NodeItem.styled';
import { NodeItemProps } from './NodeItem.types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { DeviceIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { NodeStatus } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus';

export const NodeItem: FC<NodeItemProps> = ({ node, openDevicesListModal }) => {
  console.log(node);
  const nodeInfo = (
    <BaseNodeInfo>
      <Link to={`/nodes/${node?.id}`}>
        <NodeName>Узел {node?.number}</NodeName>
        <AdditionalInfo>Ввод {node?.communicationPipes?.[0].entryNumber},  {node?.nodeServiceZone?.name}</AdditionalInfo>
      </Link>
      <Tooltip title="Показать приборы">
        <DeviceIconWrapper>
          <DeviceIcon onClick={() => openDevicesListModal(node)} />
        </DeviceIconWrapper>
      </Tooltip>
    </BaseNodeInfo>
  );

  return (
    <Wrapper>
      <NodeInfoWrapper>
        <ResourceIconWrapper>
          <ResourceIconLookup resource={node?.resource} />
        </ResourceIconWrapper>
        <NodeInfo>{nodeInfo}</NodeInfo>
      </NodeInfoWrapper>

      <NodeStatusWrapper>
        {node?.nodeStatus?.value && (
          <NodeStatus status={node?.nodeStatus?.value} />
        )}
      </NodeStatusWrapper>
    </Wrapper>
  );
};
