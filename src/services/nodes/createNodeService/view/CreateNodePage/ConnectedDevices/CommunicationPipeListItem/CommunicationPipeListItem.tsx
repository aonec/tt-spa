import React, { FC } from 'react';
import { MagistralsDisctionary } from 'dictionaries';
import {
  DiameterLabel,
  InfoWrapper,
  MagistralLabel,
  PipeNumber,
  RighContentWrapper,
  Wrapper,
} from './CommunicationPipeListItem.styled';
import { CommunicationPipeListItemProps, TrashIconSC } from './CommunicationPipeListItem.types';
import { MeteringDeviceListItem } from './MeteringDeviceListItem';

export const CommunicationPipeListItem: FC<CommunicationPipeListItemProps> = ({
  pipe,
  resource,
  handleDeletePipe,
  handleDeleteDevice,
}) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <div>
          <PipeNumber>Труба №{pipe.number}</PipeNumber>
        </div>
        <RighContentWrapper>
          <div>
            <DiameterLabel>Диаметр:</DiameterLabel> {pipe.diameter}мм{' '}
            <MagistralLabel>магистраль:</MagistralLabel>{' '}
            {pipe.magistral && MagistralsDisctionary[pipe.magistral]}
          </div>
          {handleDeletePipe && (
            <TrashIconSC onClick={() => handleDeletePipe(pipe.id)} />
          )}
        </RighContentWrapper>
      </InfoWrapper>
      <div>
        {pipe.devices?.map((device, index) => (
          <MeteringDeviceListItem
            device={device}
            resource={resource}
            handleDeleteDevice={
              handleDeleteDevice && (() => handleDeleteDevice(pipe.id, index))
            }
          />
        ))}
      </div>
    </Wrapper>
  );
};
