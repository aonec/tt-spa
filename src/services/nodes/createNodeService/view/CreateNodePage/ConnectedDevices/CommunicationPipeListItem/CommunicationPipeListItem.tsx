import React, { FC } from 'react';
import { MagistralsDisctionary } from 'dictionaries';
import {
  DiameterLabel,
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
          <PipeNumber>Труба №{pipe.number}</PipeNumber>
        </div>
        <div>
          <DiameterLabel>Диаметр:</DiameterLabel> {pipe.diameter}мм{' '}
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
