import React, { FC } from 'react';
import { MagistralsDisctionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/meteringDevicesService/view/MeteringDevicesListModal/MeteringDeviceListItem/MeteringDeviceListItem.constants';
import {
  InfoWrapper,
  MagistralLabel,
  PipeNumber,
  Wrapper,
} from './CommunicationPipeListItem.styled';
import { CommunicationPipeListItemProps } from './CommunicationPipeListItem.types';
import { MeteringDeviceListItem } from './MeteringDeviceListItem';

export const CommunicationPipeListItem: FC<CommunicationPipeListItemProps> = ({
  pipe,
  resource,
}) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <div>
          <PipeNumber>№{pipe.number}</PipeNumber> ({pipe.diameter}мм){' '}
        </div>
        <div>
          <MagistralLabel>магистраль:</MagistralLabel>{' '}
          {pipe.magistral && MagistralsDisctionary[pipe.magistral]}
        </div>
      </InfoWrapper>
      <div>
        {pipe.devices?.map((device) => (
          <MeteringDeviceListItem device={device} resource={resource} />
        ))}
      </div>
    </Wrapper>
  );
};
