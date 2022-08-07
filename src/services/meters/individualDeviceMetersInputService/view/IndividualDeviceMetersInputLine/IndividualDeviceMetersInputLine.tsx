import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { Tooltip } from 'antd';
import React, { FC, useEffect, useMemo } from 'react';
import { HistoryIcon, StarIcon } from 'ui-kit/icons';
import { MetersInputsBlock } from '../MetersInputsBlock';
import {
  DeviceOptionsWrapper,
  Wrapper,
} from './IndividualDeviceMetersInputLine.styled';
import { IndividualDeviceMetersInputLineProps } from './IndividualDeviceMetersInputLine.types';
import { getPreparedReadingsDictionary } from './individualDeviceMetersInputLine.utils';

export const IndividualDeviceMetersInputLine: FC<IndividualDeviceMetersInputLineProps> = ({
  device,
  sliderIndex,
}) => {
  const { previousReading, currentReading } = useMemo(() => {
    const preparedReadingsData = getPreparedReadingsDictionary(
      device.readings || []
    );

    const previousReading = preparedReadingsData[sliderIndex];
    const currentReading = preparedReadingsData[-1];

    return { previousReading, currentReading };
  }, [device.readings, sliderIndex]);

  return (
    <Wrapper>
      <DeviceInfo device={device} />
      <MetersInputsBlock
        reading={previousReading}
        rateType={device.rateType}
        sliderIndex={sliderIndex}
      />
      <MetersInputsBlock
        reading={currentReading}
        rateType={device.rateType}
        resource={device.resource}
        sliderIndex={sliderIndex}
      />
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
