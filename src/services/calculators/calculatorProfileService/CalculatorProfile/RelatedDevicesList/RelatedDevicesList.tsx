import React, { FC } from 'react';
import { RelatedDevicesListProps } from './RelatedDevicesList.types';
import { RelatedDevicesListItem } from './RelatedDevicesListItem';

export const RelatedDevicesList: FC<RelatedDevicesListProps> = ({
  pipeDevices,
}) => {
  const list = pipeDevices.map((pipe) => {
    const { nodeNumber, devices } = pipe;
    return devices.map((device) => (
      <RelatedDevicesListItem device={device} nodeNumber={nodeNumber} />
    ));
  });

  return <>{list}</>;
};
