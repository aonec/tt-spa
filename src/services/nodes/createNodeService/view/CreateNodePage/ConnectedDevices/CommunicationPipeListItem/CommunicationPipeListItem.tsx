import React, { FC, useMemo, useState } from 'react';
import { MagistralsDisctionary } from 'dictionaries';
import {
  DevicesAmount,
  InfoWrapper,
  PipeIconWrapper,
  PipeInfo,
  PipeNumber,
  RighContentWrapper,
  Wrapper,
} from './CommunicationPipeListItem.styled';
import {
  CommunicationPipeListItemProps,
  TrashIconSC,
} from './CommunicationPipeListItem.types';
import { MeteringDeviceListItem } from './MeteringDeviceListItem';
import { PipeIcon } from 'ui-kit/icons';
import { getDevicesCountText } from './CommunicationPipeListItem.utils';
import { ListOpeningChevron } from 'ui-kit/shared_components/ListOpeningChevron';
import { resourceFromConfig } from 'utils/resourceFromConfigLookup';

export const CommunicationPipeListItem: FC<CommunicationPipeListItemProps> = ({
  pipe,
  configuration,
  handleDeletePipe,
  handleDeleteDevice,
  isNodeConfigWithoutODPU,
  handleEditDevice,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const devicesCount = pipe.devices?.length || 0;

  const devicesCountText = getDevicesCountText(devicesCount);

  const resource = useMemo(
    () => resourceFromConfig[configuration],
    [configuration],
  );

  return (
    <Wrapper>
      <InfoWrapper>
        <PipeIconWrapper>
          <PipeIcon />
          <div>
            <PipeNumber>Труба №{pipe.number}</PipeNumber>
            <PipeInfo>
              {pipe.magistral && MagistralsDisctionary[pipe.magistral]}
              {typeof pipe.diameter === 'number' && `, ${pipe.diameter}мм`}
            </PipeInfo>
          </div>
        </PipeIconWrapper>
        <RighContentWrapper>
          <DevicesAmount>
            {devicesCount} {devicesCountText}
          </DevicesAmount>
          <ListOpeningChevron
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {handleDeletePipe && !isNodeConfigWithoutODPU && (
            <TrashIconSC onClick={() => handleDeletePipe(pipe.id)} />
          )}
        </RighContentWrapper>
      </InfoWrapper>
      {isOpen && (
        <div>
          {pipe.devices?.map((device, index) => (
            <MeteringDeviceListItem
              device={device}
              resource={resource}
              key={device.serialNumber}
              handleDeleteDevice={
                handleDeleteDevice && (() => handleDeleteDevice(pipe.id, index))
              }
              handleEditDevice={handleEditDevice}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
