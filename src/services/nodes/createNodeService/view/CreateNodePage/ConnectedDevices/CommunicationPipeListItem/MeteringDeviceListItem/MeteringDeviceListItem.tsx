import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { HousingMeteringDeviceDictionary } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm/CommonDataStep/CommonDataStep.constants';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { TrashIconSC } from '../CommunicationPipeListItem.types';
import {
  Model,
  SerialNumber,
  InfoWrapper,
  Wrapper,
  RightContent,
  DeviceType,
  DeviceInfoWrapper,
} from './MeteringDeviceListItem.styled';
import { MeteringDeviceListItemProps } from './MeteringDeviceListItem.types';

export const MeteringDeviceListItem: FC<MeteringDeviceListItemProps> = ({
  resource,
  device,
  handleDeleteDevice,
}) => {
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
          <Link to={`/housingMeteringDevices/${device.id}`}>{deviceInfo}</Link>
        )}
        {!device.id && deviceInfo}
      </InfoWrapper>
      <DeviceType>
        {HousingMeteringDeviceDictionary[device.housingMeteringDeviceType]}
      </DeviceType>
      <RightContent>
        {handleDeleteDevice && <TrashIconSC onClick={handleDeleteDevice} />}
      </RightContent>
    </Wrapper>
  );
};
