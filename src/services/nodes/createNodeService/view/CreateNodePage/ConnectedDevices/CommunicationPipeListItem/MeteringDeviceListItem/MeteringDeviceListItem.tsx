import React, { FC } from 'react';
import { HousingMeteringDeviceDictionary } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm/CommonDataStep/CommonDataStep.constants';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  Model,
  SerialNumber,
  InfoWrapper,
  Wrapper,
  TypeLabel,
} from './MeteringDeviceListItem.styled';
import { MeteringDeviceListItemProps } from './MeteringDeviceListItem.types';

export const MeteringDeviceListItem: FC<MeteringDeviceListItemProps> = ({
  resource,
  device,
}) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <ResourceIconLookup resource={resource} />
        <SerialNumber>{device.serialNumber}</SerialNumber>
        <Model>({device.model})</Model>
      </InfoWrapper>
      <div>
        <TypeLabel>Тип:</TypeLabel>{' '}
        {HousingMeteringDeviceDictionary[device.housingMeteringDeviceType]}
      </div>
    </Wrapper>
  );
};
