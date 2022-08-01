import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../../../tt-components/Icon';
import { IconWithTooltip } from '../../../../components/NotConnectedIcon/IconWithTooltip';
import { Dates } from './Dates';
import Node from './Node/Node';
import { Flex } from '../../../../shared/ui/Layout/Flex';
import { Space } from '../../../../shared/ui/Layout/Space/Space';
import { CalculatorListResponse } from '../../../../../api/types';

const DeviceBlock = ({ device: calculator }: DeviceBlockPropsInterface) => {
  const { isConnected } = calculator;
  const isConnectionError = !(
    calculator.connection?.port && calculator.connection?.ipV4
  );

  return (
    <>
      <DeviceWrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DeviceLink to={`/calculators/${calculator.id}`}>
            <Flex>
              <StockIconTT dark icon="device" fill="var(--main-100)" />
              <Space w={7} />
              {calculator.model}
              <SerialNumber>({calculator.serialNumber})</SerialNumber>
            </Flex>
          </DeviceLink>

          {!isConnected && (
            <IconWithTooltip title="Вычислитель не опрашивается">
              <Icon icon="notConnected" color="var(--main-100)" />
            </IconWithTooltip>
          )}

          {isConnected && isConnectionError && (
            <IconWithTooltip title="Проверьте настройки соединения">
              <Icon icon="checkConnection" color="var(--error)" />
            </IconWithTooltip>
          )}
        </div>

        <Dates
          firstDate={calculator.lastCheckingDate}
          lastDate={calculator.futureCheckingDate}
        />
      </DeviceWrapper>
      <div>
        {calculator.nodes?.map((node) => (
          <Node node={node} key={node.id} />
        ))}
      </div>
    </>
  );
};

interface DeviceBlockPropsInterface {
  device: Omit<CalculatorListResponse, 'address'>;
}

export const DeviceWrapper = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 3fr 1.5fr 2fr 1fr;
  margin-bottom: 24px;
  //margin-left: 24px;
  align-items: center;
  justify-content: center;
`;

export const SerialNumber = styled.span`
  margin-left: 6px;
  font-weight: normal;
  color: rgba(39, 47, 90, 0.6);
`;

export const Diameter = styled.div`
  margin: 0 auto;
`;

export const DeviceLink = styled(NavLink)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 2;
  color: #272f5a;
  margin-right: 8px;
`;

export const StockIconTT = styled(Icon)`
  margin-right: 8px;
`;

export default DeviceBlock;
