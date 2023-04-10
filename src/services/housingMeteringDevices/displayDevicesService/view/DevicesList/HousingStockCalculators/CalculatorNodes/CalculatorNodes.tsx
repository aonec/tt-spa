import React, { FC } from 'react';
import { CalculatorNodesProps } from './CalculatorNodes.types';
import {
  CalculatorIconWrapper,
  CalculatorModelWrapper,
  CalculatorTitle,
  CalculatorWithStatusWrapper,
  DeviceLink,
  SerialNumber,
} from './CalculatorNodes.styled';
import {
  CalculatorIcon,
  CheckConnection,
  NoConnectionIcon,
} from 'ui-kit/icons';
import { NodeDevices } from './NodeDevices';
import { DateRange } from 'ui-kit/shared_components/DateRange';

export const CalculatorNodes: FC<CalculatorNodesProps> = ({ calculator }) => {
  const { isConnected } = calculator;
  const isConnectionError = !(
    calculator.connection?.port && calculator.connection?.ipV4
  );

  return (
    <>
      <CalculatorTitle>
        <CalculatorWithStatusWrapper>
          <DeviceLink to={`/calculators/${calculator.id}`}>
            <CalculatorModelWrapper>
              <CalculatorIconWrapper>
                <CalculatorIcon />
              </CalculatorIconWrapper>
              {calculator.model}
              <SerialNumber>({calculator.serialNumber})</SerialNumber>
            </CalculatorModelWrapper>
          </DeviceLink>

          {!isConnected && <NoConnectionIcon />}
          {isConnected && isConnectionError && <CheckConnection />}
        </CalculatorWithStatusWrapper>

        <DateRange
          firstDate={calculator.lastCheckingDate}
          lastDate={calculator.futureCheckingDate}
        />
      </CalculatorTitle>

      {calculator.nodes?.map((node) => (
        <NodeDevices node={node} key={node.id} />
      ))}
    </>
  );
};
