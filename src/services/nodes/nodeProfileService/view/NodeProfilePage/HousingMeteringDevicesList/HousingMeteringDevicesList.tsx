import React, { FC } from 'react';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';
import { CommunicationPipeListItem } from 'services/nodes/createNodeService/view/CreateNodePage/ConnectedDevices/CommunicationPipeListItem';
import { HousingMeteringDevicesListProps } from './HousingMeteringDevicesList.types';

export const HousingMeteringDevicesList: FC<
  HousingMeteringDevicesListProps
> = ({ communicationPipes, resource }) => {
  return (
    <div>
      {communicationPipes.map((pipe) => (
        <CommunicationPipeListItem
          resource={resource}
          pipe={pipe as CommunicationPipePayload}
          key={pipe.id}
        />
      ))}
    </div>
  );
};
