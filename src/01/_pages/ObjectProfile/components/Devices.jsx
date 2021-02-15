import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import { IconTT } from '../../../tt-components/IconTT';
import { Name, Serial } from '../../Node/components/Connection';
import { getDeviceTasks } from '../apiObjectProfile';

function statusIcon(closingDate) {
    return closingDate === null ? 'green' : 'red';
}

function status(closingDate) {
    return closingDate === null ? 'Активен' : 'Не активен';
}

export const Devices = ({ calculators }) => {
  const CalculatorItem = ({ calculator }) => {
    const [tasks, setTasks] = useState([]);
    const {
      id, model, serialNumber, closingDate, nodes,
    } = calculator;

    useEffect(() => {
      getDeviceTasks(id).then((res) => {
        const { items } = res;
        setTasks(items);
      });
    }, []);

    const CalculatorTasksIcon = () => (tasks.length > 0 ? <IconTT icon="alarm" /> : null);


    return (
      <Calculator>
        <Link to={`/calculators/${id}`}>
          <CalculatorMainInfo>
            <IconTT icon="device" />
            <Name>{model}</Name>
            <Serial>{` (${serialNumber})`}</Serial>
            <CalculatorTasksIcon />
          </CalculatorMainInfo>
        </Link>

        <Div>
          <IconTT icon={statusIcon(closingDate)} />
          <span>{status(closingDate)}</span>
        </Div>
      </Calculator>
    );
  };

  const NodesWithDevices = ({ nodes, closingDate }) => nodes.map((node, index) => {
    const {
      id: nodeId, serviceZone, nodeStatus, communicationPipes, number,
    } = node;

    const devicesOnNode = _.flatten(communicationPipes.map((item) => {
      const res = item.devices.map((resItem) => resItem);

      return res;
    }));

    const NodeDevices = () => devicesOnNode.map((value) => {
      const {
        model,
        serialNumber,
        closingdate,
        hub,
        resource,
        id,
        housingStockId,
      } = value;

      return (
        <NodeDeviceWrap key={id}>
          <NavLink to={`/housingMeteringDevices/${id}`}>
            <Div style={{ marginLeft: 24 }}>
              <IconTT icon={resource.toLowerCase()} style={{ marginRight: '8px' }} />
              <Name style={{ marginRight: '8px' }}>{model}</Name>
              <Serial>{` (${serialNumber})`}</Serial>
            </Div>
          </NavLink>
          <Div>
              <IconTT icon={statusIcon(closingDate)} />
              <span>{status(closingDate)}</span>
          </Div>
        </NodeDeviceWrap>
      );
    });

    return (
      <NodeWrap>
        <NodeItem node={node} />
        <NodeDevices />
      </NodeWrap>
    );
  });

  const NodeItem = ({ node }) => {
    const {
      id: nodeId, serviceZone, nodeStatus, communicationPipes, number,
    } = node;
    return (
      <Node>
        <NavLink to={`/nodes/${nodeId}`}>
          <Div style={{ marginLeft: 24 }}>
            <IconTT icon="node" style={{ marginRight: '8px' }} />
            <Name style={{ marginRight: '8px' }}>{`Узел ${number}`}</Name>
          </Div>
        </NavLink>
        <Div>
          <IconTT icon="ok" />
          <span>{nodeStatus}</span>
        </Div>
      </Node>
    );
  };

  const Result = ({ calculators }) => {
    if (calculators) {
      const calculatorsArray = calculators.items;

      const res = calculatorsArray.map((calculator) => {
        const {
          id, model, serialNumber, closingDate, nodes,
        } = calculator;

        return (
          <div>
            <CalculatorItem calculator={calculator} />
            <NodesWithDevices nodes={nodes} closingDate={closingDate} />
          </div>
        );
      });
      return res;
    }
    return null;
  };

  return (
    <div>
      <h2>Список приборов ОДПУ</h2>
      <Result calculators={calculators} />
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
`;

const Node = styled.div`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-gap: 4px;
`;

const NodeWrap = styled.div`
  grid-gap: 4px;
`;

const Div = styled.div`
  display: inline-flex;
  align-items: center;
`;

const NodeDeviceWrap = styled.div`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-gap: 4px;
  grid-template-rows: 48px;
  align-items: center;
  opacity: 0.8;
`;

// const Node = () =>
//
// {
// calculatorId: 2538454
// communicationPipes: [{…}]
// futureCommercialAccountingDate: "2023-03-20T00:00:00"
// id: 1387
// lastCommercialAccountingDate: "2019-11-19T00:00:00"
// nodeResourceType: "ColdWaterSupply"
// nodeStatus: "Сдан на коммерческий учет"
// number: 1
// serviceZone: "Апартаменты"
// }
