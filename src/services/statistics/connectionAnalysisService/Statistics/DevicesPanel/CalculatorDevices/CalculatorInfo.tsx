import React, { FC } from 'react';
import {
  DeviceInfoWrapper,
  DeviceTitleWrapper,
  Model,
  SerialNumber,
  StatusWrapper,
  Wrapper,
} from './CalculatorInfo.styled';
import { Props } from './CalculatorInfo.types';
import { Link } from 'react-router-dom';
import { CalculatorIcon } from 'ui-kit/icons';
import { StatusBar } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus/DeviceStatus.styled';

export const CalculatorInfo: FC<Props> = ({ device }) => {
  const deviceInfo = (
    <DeviceInfoWrapper>
      <Model>{device.model}</Model>
      <SerialNumber>({device.serialNumber})</SerialNumber>
    </DeviceInfoWrapper>
  );

  return (
    <Wrapper>
      <DeviceTitleWrapper>
        <CalculatorIcon />

        {device.id && (
          <Link to={`/calculators/${device.id}/profile`}>{deviceInfo}</Link>
        )}
        {!device.id && deviceInfo}
      </DeviceTitleWrapper>

      <StatusWrapper>
        <StatusBar isActive={device.isConnected} />
        {device.isConnected ? 'Активен' : 'Нет соединения'}
      </StatusWrapper>
    </Wrapper>
  );
};
