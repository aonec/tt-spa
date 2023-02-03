import { Tooltip } from 'antd';
import React, { FC } from 'react';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import {
  DeviceInformation,
  DeviceLink,
  DeviceModelText,
  Wrapper,
} from './RelatedDevicesListItem.styled';
import { RelatedDevicesListItemProps } from './RelatedDevicesListItem.types';

export const RelatedDevicesListItem: FC<RelatedDevicesListItemProps> = ({
  device,
  nodeNumber,
}) => {
  const { id, model, serialNumber, hub, closingDate } = device;
  const isActive = closingDate === null;

  return (
    <Wrapper>
      <Tooltip title={`${model} (${serialNumber})`}>
        <DeviceLink to={`/housingMeteringDevices/${id}`}>
          <DeviceModelText>{model}</DeviceModelText>
          <div>({serialNumber})</div>
        </DeviceLink>
      </Tooltip>
      <DeviceStatus isActive={isActive} />
      <DeviceInformation>
        <div>Ввод: {hub?.entryNumber || '-'}</div>
        <div>Узел: {nodeNumber}</div>
        <div>Труба: {hub?.pipeNumber || '-'}</div>
      </DeviceInformation>
    </Wrapper>
  );
};
