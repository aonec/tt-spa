import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { IconTT } from '../../../tt-components/IconTT';
import { Name, Serial } from '../../../tt-components';
import { nodeStatusList } from '../../../tt-components/localBases';
import { Tooltip } from 'antd';
import { groupNodesByCalculator } from './utis/groupNodesByCalculator';
import { CalculatorWrapper } from '../CalculatorWrapper';
import { Space } from '../../../shared/ui/Layout/Space/Space';
import { Flex } from '../../../shared/ui/Layout/Flex';

function statusIcon(closingDate) {
  return !closingDate ? 'green' : 'red';
}

function status(closingDate) {
  return !closingDate ? 'Активен' : 'Не активен';
}

export const Devices = ({ nodes }) => {
  // Вычислитель
  const CalculatorItem = ({ calculator }) => {
    const [tasks, setTasks] = useState([]);
    const { id, model, serialNumber, closingDate } = calculator || {};

    const CalculatorTasksIcon = () =>
      tasks.length > 0 ? <IconTT icon="alarm" /> : null;

    return (
      <Calculator>
        <CalculatorWrapper id={id}>
          <CalculatorMainInfo>
            <Flex>
              <IconTT icon="device" />
              <Space />
              <Name>{model ? model : 'Вычислитель отсутствует'}</Name>
            </Flex>
            <Serial>{serialNumber ? `(${serialNumber})` : null}</Serial>
            <CalculatorTasksIcon />
          </CalculatorMainInfo>
        </CalculatorWrapper>

        <CalculatorStatus>
          <Flex>
            <IconTT icon={statusIcon(closingDate)} />
            <Space />
            <div>{status(closingDate)}</div>
          </Flex>
        </CalculatorStatus>
      </Calculator>
    );
  };

  // Узел
  const NodeItem = ({ node }) => {
    const { id: nodeId, nodeStatus, number, resource } = node;

    const statusValue = nodeStatus?.value;
    const statusDescription = nodeStatus?.description;

    const getNodeIconStatus =
      _.find(nodeStatusList, { value: statusValue })?.icon ?? 'alarm';

    return (
      <Node>
        <NavLink to={`/nodes/${nodeId}`}>
          <NodeMainInfo>
            <IconTT icon={resource.toLowerCase()} />
            <Name>{`Узел ${number}`}</Name>
          </NodeMainInfo>
          <NodeZone>{statusDescription}</NodeZone>
        </NavLink>
        <Tooltip
          placement="topLeft"
          title={statusDescription}
          color={'#272F5A'}
        >
          <NodeStatus>
            <IconTT icon={getNodeIconStatus} />
            <span>{statusDescription}</span>
          </NodeStatus>
        </Tooltip>
      </Node>
    );
  };

  const NodeDevice = ({ device, closingDate }) => {
    const { model, serialNumber, id } = device;

    return (
      <NodeDeviceWrap key={id}>
        <NavLink to={`/housingMeteringDevices/${id}`}>
          <NodeDeviceMainInfo>
            <Name>{model}</Name>
            <Serial>{` (${serialNumber})`}</Serial>
          </NodeDeviceMainInfo>
        </NavLink>
        <DeviceStatus>
          <IconTT icon={statusIcon(closingDate)} />
          <span>{status(closingDate)}</span>
        </DeviceStatus>
      </NodeDeviceWrap>
    );
  };

  // Нет Устройств Узла
  const NoNodeDevice = ({ device, closingDate }) => {
    // const {
    //     model,
    //     serialNumber,
    //     closingdate,
    //     hub,
    //     resource,
    //     id,
    //     housingStockId,
    // } = device;

    return (
      <NodeDeviceWrap key={0}>
        {/*<NavLink to={`/housingMeteringDevices/${id}`}>*/}
        <NodeDeviceMainInfo>
          <span>На данном узле нет устройств</span>
        </NodeDeviceMainInfo>
        {/*</NavLink>*/}
        {/*<DeviceStatus>*/}
        {/*    <IconTT icon={statusIcon(closingDate)}/>*/}
        {/*    <span>{status(closingDate)}</span>*/}
        {/*</DeviceStatus>*/}
      </NodeDeviceWrap>
    );
  };

  // Узел с его устройствами
  const NodesWithDevices = ({ nodes, closingDate }) =>
    nodes.map((node, index) => {
      const {
        id: nodeId,
        serviceZone,
        nodeStatus,
        communicationPipes,
        number,
      } = node;

      const devicesOnNode = _.flatten(
        communicationPipes.map((communicationPipe) =>
          communicationPipe.devices.map((resItem) => resItem)
        )
      );

      const NodeDevices = () =>
        devicesOnNode.map((device) => (
          <NodeDevice
            device={device}
            closingDate={closingDate}
            key={device.id}
          />
        ));

      return (
        <NodeWrap key={node.id}>
          <NodeItem node={node} />
          {_.isEmpty(devicesOnNode) ? <NoNodeDevice /> : <NodeDevices />}
        </NodeWrap>
      );
    });

  const Result = ({ nodes }) => {
    const calculators = groupNodesByCalculator(nodes);

    if (nodes) {
      const res = calculators.map((calculator) => {
        const { id, model, serialNumber, closingDate, nodes } = calculator;
        return (
          <div key={calculator.id}>
            <CalculatorItem calculator={calculator} />
            <NodesWithDevices nodes={nodes} closingDate={closingDate} />
          </div>
        );
      });
      return res;
    }
    return <div>Загрузка</div>;
  };

  if (!nodes) {
    return <div>Загрузка</div>;
  }

  return (
    <div>
      <h2>Список приборов ОДПУ</h2>
      <Result nodes={nodes} />
    </div>
  );
};
export default Devices;

const Calculator = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 6fr 6fr;
  grid-gap: 4px;
  grid-template-rows: 48px;
`;

const CalculatorMainInfo = styled.div`
  display: inline-grid;
  align-items: center;
  grid-column-gap: 8px;
  grid-template-columns: auto auto auto auto;

  &:hover {
    h3,
    div,
    p,
    span {
      color: #40a9ff;
    }
  }
`;

const NodeZone = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  padding-left: 48px;
  color: rgba(39, 47, 90, 0.7);
`;

const CalculatorStatus = styled.div`
  display: inline-grid;
  align-items: center;
  grid-column-gap: 4px;
  grid-template-columns: auto 1fr;
`;

const NodeMainInfo = styled.div`
  margin-left: 24px;
  display: inline-grid;
  align-items: center;
  grid-column-gap: 8px;
  grid-template-columns: auto auto auto auto;

  &:hover {
    h3,
    div,
    p,
    span {
      color: #40a9ff;
    }
  }
`;

const Node = styled.div`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-gap: 4px;
  align-items: baseline;
`;

const NodeWrap = styled.div`
  grid-gap: 4px;
`;

const NodeStatus = styled.div`
  cursor: pointer;
  display: inline-grid;
  align-items: center;
  grid-column-gap: 4px;
  grid-template-columns: auto 1fr;
`;

const NodeDeviceWrap = styled.div`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-gap: 4px;
  grid-template-rows: 48px;
  align-items: center;
  opacity: 0.8;
`;

const NodeDeviceMainInfo = styled.div`
  margin-left: 48px;
  display: inline-grid;
  align-items: center;
  grid-column-gap: 8px;
  grid-template-columns: auto auto auto auto;

  &:hover {
    h3,
    div,
    p,
    span {
      color: #40a9ff;
    }
  }
`;

const DeviceStatus = styled.div`
  display: inline-grid;
  align-items: center;
  grid-column-gap: 4px;
  grid-template-columns: auto 1fr;
`;
