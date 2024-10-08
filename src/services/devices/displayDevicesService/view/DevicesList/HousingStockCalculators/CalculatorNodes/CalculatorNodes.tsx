import React, { FC } from 'react';
import { CalculatorNodesProps } from './CalculatorNodes.types';
import {
  CalculatorIconWrapper,
  CalculatorModelWrapper,
  CalculatorTitle,
  CalculatorWithStatusWrapper,
  DeviceLink,
  NoCalculatorText,
  SerialNumber,
} from './CalculatorNodes.styled';
import {
  CalculatorIcon,
  CheckConnection,
  NoConnectionIcon,
} from 'ui-kit/icons';
import { NodeDevices } from './NodeDevices';
import { DateRange } from 'ui-kit/shared/DateRange';

export const CalculatorNodes: FC<CalculatorNodesProps> = ({ devices }) => {
  const calculator = devices[0].calculator;
  const devicesList = devices?.map((node) => (
    <NodeDevices node={node} key={node.id} />
  ));

  if (!calculator) {
    return (
      <>
        <NoCalculatorText>Нет вычислителя</NoCalculatorText>
        {devicesList}
      </>
    );
  }

  const { isConnected } = calculator;
  const isConnectionError = !(
    calculator.connection?.port && calculator.connection?.ipV4
  );

  return (
    <>
      <CalculatorTitle>
        <CalculatorWithStatusWrapper>
          <DeviceLink to={`/calculators/${calculator.id}/profile`}>
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

      {devicesList}
    </>
  );
};
