import React, { FC } from 'react';
import {
  DeviceInfoWrapper,
  DeviceTitleWrapper,
  DeviceType,
  Model,
  RightContent,
  SerialNumber,
  Wrapper,
} from './CalculatorDevices.styled';
import { Props } from './CalculatorDevices.types';
import { InfoWrapper } from '../DevicesPanel.styled';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { Link } from 'react-router-dom';
import { HousingMeteringDeviceDictionary } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm/CommonDataStep/CommonDataStep.constants';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { DeviceIcon } from 'ui-kit/icons';

export const CalculatorDevices: FC<Props> = ({ resource, device }) => {
  const deviceInfo = (
    <DeviceInfoWrapper>
      <SerialNumber>{device.serialNumber}</SerialNumber>
      <Model>({device.model})</Model>
    </DeviceInfoWrapper>
  );

  return (
    <Wrapper>
        <DeviceTitleWrapper>
          <ResourceIconLookup resource={resource} />
          {device.id && (
            <Link to={`/housingMeteringDevices/${device.id}/profile`}>
              {deviceInfo}
            </Link>
          )}
          {!device.id && deviceInfo}
        </DeviceTitleWrapper>
      <DeviceStatus isActive={device.isActive} />
      <DeviceType>
        {HousingMeteringDeviceDictionary[device.housingMeteringDeviceType]}
      </DeviceType>
      <DeviceIcon />
    </Wrapper>
  );
};
