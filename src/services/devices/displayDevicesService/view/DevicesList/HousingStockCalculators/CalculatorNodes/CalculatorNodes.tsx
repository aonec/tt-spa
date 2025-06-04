import React, { FC } from 'react';
import { CalculatorNodesProps } from './CalculatorNodes.types';
import {
  CalculatorIconWrapper,
  CalculatorModelWrapper,
  CalculatorTitle,
  CalculatorWithStatusWrapper,
  ChevronSC,
  ChevronWrapper,
  DeviceLink,
  DevicesWrapper,
  NoCalculatorText,
  NodeScore,
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
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';

export const CalculatorNodes: FC<CalculatorNodesProps> = ({
  devices,
  isOpen,
  setIsOpen,
}) => {
  const calculator = devices[0].calculator;
  const devicesList = devices?.map((node) => (
    <NodeDevices node={node} key={node.id} />
  ));

  if (!calculator) {
    return (
      <>
        <NoCalculatorText>
          <div>Нет вычислителя</div>
          <NodeScore>{devices.length} узла</NodeScore>
          <ContextMenuButton size="small" />
          <ChevronWrapper onClick={() => setIsOpen(!isOpen)}>
            <ChevronSC isOpen={isOpen} />
          </ChevronWrapper>
        </NoCalculatorText>
        {isOpen && <DevicesWrapper> {devicesList}</DevicesWrapper>}
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

        <NodeScore>{devices.length} узла</NodeScore>

        <ContextMenuButton size="small" />

        <ChevronWrapper onClick={() => setIsOpen(!isOpen)}>
          <ChevronSC isOpen={isOpen} />
        </ChevronWrapper>
      </CalculatorTitle>
      {isOpen && <DevicesWrapper> {devicesList}</DevicesWrapper>}
    </>
  );
};
