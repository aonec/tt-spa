import React, { FC } from 'react';
import { HousingMeteringDeviceDictionary } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm/CommonDataStep/CommonDataStep.constants';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { TrashIconSC } from '../CommunicationPipeListItem.types';
import {
  Model,
  SerialNumber,
  InfoWrapper,
  Wrapper,
  TypeLabel,
  RightContent,
} from './MeteringDeviceListItem.styled';
import { MeteringDeviceListItemProps } from './MeteringDeviceListItem.types';

export const MeteringDeviceListItem: FC<MeteringDeviceListItemProps> = ({
  resource,
  device,
  handleDeleteDevice,
}) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <ResourceIconLookup resource={resource} />
        <SerialNumber>{device.serialNumber}</SerialNumber>
        <Model>({device.model})</Model>
      </InfoWrapper>
      <RightContent>
        <div>
          <TypeLabel>Тип:</TypeLabel>{' '}
          {HousingMeteringDeviceDictionary[device.housingMeteringDeviceType]}
        </div>
        {handleDeleteDevice && <TrashIconSC onClick={handleDeleteDevice} />}
      </RightContent>
    </Wrapper>
  );
};
