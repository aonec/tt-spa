import React, { FC } from 'react';
import {
  DeviceInfoWrapper,
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

export const CalculatorDevices: FC<Props> = ({ resource, device }) => {
  const deviceInfo = (
    <DeviceInfoWrapper>
      <SerialNumber>{device.serialNumber}</SerialNumber>
      <Model>({device.model})</Model>
    </DeviceInfoWrapper>
  );

  return (
    <Wrapper>
      <InfoWrapper>
        <ResourceIconLookup resource={resource} />
        {device.id && (
          <Link to={`/housingMeteringDevices/${device.id}/profile`}>
            {deviceInfo}
          </Link>
        )}
        {!device.id && deviceInfo}
      </InfoWrapper>
      <DeviceType>
        {HousingMeteringDeviceDictionary[device.housingMeteringDeviceType]}
      </DeviceType>
      <RightContent></RightContent>
    </Wrapper>
  );
};
