import React, { FC } from 'react';
import {
  DeviceInfoWrapper,
  DeviceTitleWrapper,
  Model,
  SerialNumber,
  Wrapper,
} from './CalculatorInfo.styled';
import { Props } from './CalculatorInfo.types';
import { Link } from 'react-router-dom';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { CalculatorIcon } from 'ui-kit/icons';

export const CalculatorInfo: FC<Props> = ({ device }) => {
  const deviceInfo = (
    <DeviceInfoWrapper>
      <Model>({device.model})</Model>
      <SerialNumber>{device.serialNumber}</SerialNumber>
    </DeviceInfoWrapper>
  );

  return (
    <Wrapper>
      <DeviceTitleWrapper>
        <CalculatorIcon />

        {device.id && (
          <Link to={`/housingMeteringDevices/${device.id}/profile`}>
            {deviceInfo}
          </Link>
        )}
        {!device.id && deviceInfo}
      </DeviceTitleWrapper>
      <DeviceStatus isActive={device.isConnected} />
    </Wrapper>
  );
};
