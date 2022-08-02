import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { Tooltip } from 'antd';
import React, { FC } from 'react';
import { HistoryIcon, StarIcon } from 'ui-kit/icons';
import {
  DeviceOptionsWrapper,
  Wrapper,
} from './IndividualDeviceMetersInput.styled';
import { IndividualDeviceMetersInputProps } from './IndividualDeviceMetersInput.types';

export const IndividualDeviceMetersInput: FC<IndividualDeviceMetersInputProps> = ({
  device,
}) => {
  return (
    <Wrapper>
      <DeviceInfo device={device} />
      <div></div>
      <div></div>
      <DeviceOptionsWrapper>
        <StarIcon style={{ cursor: 'pointer' }} className="device-option" />
        <Tooltip title="История показаний" className="device-option">
          <HistoryIcon style={{ cursor: 'pointer' }} />
        </Tooltip>
        <div className="device-option">
          <ContextMenuButton menuButtons={[]} size="small" />
        </div>
      </DeviceOptionsWrapper>
    </Wrapper>
  );
};
