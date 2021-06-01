import React from 'react';
import styled from 'styled-components';
import { IconTT } from '../../../tt-components';
import { CalculatorResponse } from '../../../../myApi';
import DeviceIcons from '../../../_components/DeviceIcons';
import Icon from '../../../tt-components/Icon';
import { serviceZoneListEnum } from '../../../tt-components/localBases';

interface NodesInterface {
  device: CalculatorResponse | null;
}

interface NodeInterface {
  id: number;
  number: any;
  nodeStatus: string;
  serviceZone: string;
  lastCheckingDate: string;
  futureCheckingDate: string;
  resource: string;
}
interface NodeStatusInterface {
  nodeStatus: string | null;
}

export const Nodes = ({ device }: NodesInterface) => {
  if (!device) {
    return null;
  }
  const { nodes } = device;

  if (!nodes || nodes.length === 0) {
    return <div>Нет узлов</div>;
  }

  const NodeStatus = ({ nodeStatus }: NodeStatusInterface) => {
    let icon;
    if (nodeStatus === 'Сдан на коммерческий учет') {
      icon = <IconTT icon="ok" size={16} style={{ marginRight: '8px' }} />;
    }
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '8px',
        }}
      >
        {icon}
        <Span>{nodeStatus}</Span>
      </div>
    );
  };

  const result = nodes.map((node) => {
    const { id, number, nodeStatus, nodeServiceZone, resource } = node;

    const { icon, color } = DeviceIcons[resource!];

    return (
      <ListItem key={id}>
        <NameWrap href={`/nodes/${id}`}>
          <Icon icon={icon} color={color} style={{ marginRight: '8px' }} />
          <Name>{`Узел ${number}`}</Name>
        </NameWrap>

        <NodeStatus nodeStatus={nodeStatus.value} />
        <Span>{nodeServiceZone.name}</Span>
      </ListItem>
    );
  });

  return <ListWrap>{result}</ListWrap>;
};

export default Nodes;

export const Template = styled.div``;

export const NameWrap = styled.a`
  display: grid;
  grid-template-columns: 1fr 11fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`;

const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`;

const Title = styled.h2``;

const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 2fr 2fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
const Span = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;
