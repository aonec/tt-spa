import { Tooltip } from 'antd';
import React, { FC } from 'react';
import {
  DeviceInformation,
  DeviceLink,
  DeviceModelText,
  Wrapper,
} from './RelatedDevicesListItem.styled';
import { RelatedDevicesListItemProps } from './RelatedDevicesListItem.types';

export const RelatedDevicesListItem: FC<RelatedDevicesListItemProps> = ({
  device,
  nodeNumber
}) => {
  const { id, model, serialNumber, isActive, hub } = device;
  return (
    <Wrapper>
      <Tooltip title={`${model} (${serialNumber})`}>
        <DeviceLink to={`/housingMeteringDevices/${id}`}>
          <DeviceModelText>{model}</DeviceModelText>
          <div>({serialNumber})</div>
        </DeviceLink>
      </Tooltip>
      <DeviceInformation>
        <div>Ввод: {hub?.entryNumber || '-'}</div>
        <div>Узел: {nodeNumber}</div>
        <div>Труба: {hub?.pipeNumber || '-'}</div>
      </DeviceInformation>
    </Wrapper>
  );
};
