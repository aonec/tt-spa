import React, { FC } from 'react';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';
import { CommunicationPipeListItem } from 'services/nodes/createNodeService/view/CreateNodePage/ConnectedDevices/CommunicationPipeListItem';
import { HousingMeteringDevicesListProps } from './HousingMeteringDevicesList.types';

export const HousingMeteringDevicesList: FC<
  HousingMeteringDevicesListProps
> = ({
  communicationPipes,
  configuration,
  handleEditDevice,
  handleDeleteDevice,
}) => {
  // isConfigWithoutODPU

  return (
    <div>
      {communicationPipes.map((pipe) => (
        <CommunicationPipeListItem
          configuration={configuration}
          pipe={{ ...pipe, id: String(pipe.id) } as CommunicationPipePayload}
          key={pipe.id}
          handleEditDevice={handleEditDevice}
          handleDeleteDevice={
            handleDeleteDevice &&
            ((_, deviceIndex) =>
              handleDeleteDevice((pipe.devices || [])?.[deviceIndex]))
          }
          // isConfigWithoutODPU={isConfigWithoutODPU}
        />
      ))}
    </div>
  );
};
