import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { Tooltip } from 'antd';
import React, { FC } from 'react';
import { HistoryIcon, StarIcon } from 'ui-kit/icons';
import { MetersInputsBlock } from '../MetersInputsBlock';
import {
  DeviceOption,
  DeviceOptionsWrapper,
  Wrapper,
} from './IndividualDeviceMetersInputLine.styled';
import { IndividualDeviceMetersInputLineProps } from './IndividualDeviceMetersInputLine.types';

export const IndividualDeviceMetersInputLine: FC<IndividualDeviceMetersInputLineProps> = ({
  device,
  sliderIndex,
  openReadingsHistoryModal,
  previousReading,
  currentReading,
  inputIndex,
}) => {
  return (
    <Wrapper>
      <DeviceInfo device={device} />
      <MetersInputsBlock
        reading={previousReading}
        rateType={device.rateType}
        sliderIndex={sliderIndex}
        isPrevious
        inputIndex={inputIndex}
      />
      <MetersInputsBlock
        reading={currentReading}
        rateType={device.rateType}
        resource={device.resource}
        sliderIndex={sliderIndex}
        inputIndex={inputIndex}
      />
      <DeviceOptionsWrapper>
        <DeviceOption>
          <StarIcon style={{ cursor: 'pointer' }} />
        </DeviceOption>
        <DeviceOption>
          <Tooltip title="История показаний">
            <HistoryIcon
              onClick={openReadingsHistoryModal}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </DeviceOption>
        <DeviceOption>
          <ContextMenuButton menuButtons={[]} size="small" />
        </DeviceOption>
      </DeviceOptionsWrapper>
    </Wrapper>
  );
};
