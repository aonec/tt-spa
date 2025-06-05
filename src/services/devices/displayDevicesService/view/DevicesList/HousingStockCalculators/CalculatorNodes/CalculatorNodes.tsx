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
  WarningIcon,
} from 'ui-kit/icons';
import { NodeDevices } from './NodeDevices';
import { DateRange } from 'ui-kit/shared/DateRange';
import { EConnectionStatusType } from 'api/types';
import { Tooltip } from 'ui-kit/shared/Tooltip';

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

  const { isConnected, connectionInfo } = calculator;
  const isConnectionError = !(
    calculator.connection?.port && calculator.connection?.ipV4
  );

  const isMalfunction =
    connectionInfo?.status === EConnectionStatusType.DeviceMalfunction;

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

          {!isConnected && (
            <Tooltip title="Вычислитель не опрашивается">
              <NoConnectionIcon />
            </Tooltip>
          )}
          {isConnected && isConnectionError && (
            <Tooltip title="Проверьте настройки соединения">
              <CheckConnection />
            </Tooltip>
          )}
          {isMalfunction && (
            <Tooltip title="Вычислитель неисправен">
              <WarningIcon />
            </Tooltip>
          )}
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
