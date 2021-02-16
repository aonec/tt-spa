import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { ObjectContext } from '../index';
import { IconTT } from '../../../tt-components/IconTT';

export const Devices = () => {
  const { calculators } = useContext(ObjectContext);

  const Result = () => {
    if (calculators) {
      const calculatorsArray = calculators.items;

      const res = calculatorsArray.map((calculator) => {
        const {
          id, model, serialNumber, closingDate, nodes,
        } = calculator;

        const NodesWithDevices = () => {
          return nodes.map((node, index) => {
            const {
              id: nodeId, serviceZone, nodeStatus, communicationPipes, number
            } = node;

            const devicesOnNode = _.flatten(communicationPipes.map((item) => {
              const res = item.devices.map((resItem) => {
                return resItem;
              });

              return res;
            }));
            const NodeItem = () => {
              return <Node>
                <NavLink to={`/nodes/${nodeId}`}>
                  <Div style={{ marginLeft: 24 }}>
                    <IconTT icon="node" style={{ marginRight: '8px' }}/>
                    <Name style={{ marginRight: '8px' }}>{`Узел ${number}`}</Name>
                  </Div>
                </NavLink>
                <Div>
                  <IconTT icon='ok'/>
                  <span>{nodeStatus}</span>
                </Div>
              </Node>
            }
            const NodeDevices = () => {

              return devicesOnNode.map((value) => {
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
                        <IconTT icon={resource.toLowerCase()} style={{ marginRight: '8px' }}/>
                        <Name style={{ marginRight: '8px' }}>{model}</Name>
                        <Serial>{` (${serialNumber})`}</Serial>
                      </Div>
                    </NavLink>
                    <Div>
                      <IconTT icon={closingDate === null ? 'green' : 'red'}/>
                      <span>{closingDate === null ? 'Активен' : 'Не активен'}</span>
                    </Div>
                  </NodeDeviceWrap>
                );
              })

            };


            return (
              <NodeWrap>
                <NodeItem/>
                <NodeDevices/>
              </NodeWrap>
            );
          });
        }


        return (
          <div>
            <Calculator>
              <NavLink to={`/calculators/${id}`} style={{ display: 'flex', alignItems: 'center' }}>
                <IconTT icon="device" style={{ marginRight: '8px' }}/>
                <Name style={{ marginRight: '8px' }}>{model}</Name>
                <Serial>{` (${serialNumber})`}</Serial>
              </NavLink>

              <Div>
                <IconTT icon={closingDate === null ? 'green' : 'red'}/>
                <span>{closingDate === null ? 'Активен' : 'Не активен'}</span>
              </Div>
            </Calculator>

            <NodesWithDevices/>

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
      <Result/>
    </div>
  );
};
export default Devices;


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
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

const Calculator = styled.div`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-gap: 4px;
  grid-template-rows: 48px;
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

// const NodeProfile = () =>
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
