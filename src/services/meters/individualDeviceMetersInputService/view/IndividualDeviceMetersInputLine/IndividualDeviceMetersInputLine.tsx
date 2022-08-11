import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
import { HistoryIcon, StarIcon } from 'ui-kit/icons';
import { getMeasurementUnit } from '../../individualDeviceMetersInputService.utils';
import { MetersInputsBlock } from '../MetersInputsBlock';
import { getRateNum } from '../MetersInputsBlock/MetersInputsBlock.utils';
import {
  DeviceOptionsWrapper,
  Wrapper,
} from './IndividualDeviceMetersInputLine.styled';
import { IndividualDeviceMetersInputLineProps } from './IndividualDeviceMetersInputLine.types';
import { getPreviousMeterTooltipTitle } from './individualDeviceMetersInputLine.utils';

export const IndividualDeviceMetersInputLine: FC<IndividualDeviceMetersInputLineProps> = ({
  device,
  sliderIndex,
  openReadingsHistoryModal,
  previousReading,
  currentReading,
  inputIndex,
  handleUploadReading,
  uploadingMetersStatuses,
  previousReadingByCurrentSliderIndex,
}) => {
  const isDeviceClosed = useMemo(() => {
    return Boolean(device.closingDate);
  }, [device]);

  const previousReadingTooltipTitle = useMemo(
    () =>
      previousReadingByCurrentSliderIndex &&
      getPreviousMeterTooltipTitle(
        previousReadingByCurrentSliderIndex,
        getRateNum(device.rateType),
        getMeasurementUnit(device.resource)
      ),
    [previousReadingByCurrentSliderIndex, device]
  );

  return (
    <Wrapper>
      <DeviceInfo device={device} />
      <MetersInputsBlock
        handleUploadReading={handleUploadReading}
        reading={previousReading}
        rateType={device.rateType}
        sliderIndex={sliderIndex}
        isPrevious
        inputIndex={inputIndex}
        isDisabled={isDeviceClosed}
        status={uploadingMetersStatuses[sliderIndex]}
        tooltip={(!previousReading && previousReadingTooltipTitle) || ''}
      />
      <MetersInputsBlock
        handleUploadReading={handleUploadReading}
        reading={currentReading}
        rateType={device.rateType}
        resource={device.resource}
        sliderIndex={-1}
        inputIndex={inputIndex}
        isDisabled={isDeviceClosed}
        status={uploadingMetersStatuses[-1]}
        tooltip={
          (!previousReading &&
            !currentReading &&
            previousReadingTooltipTitle) ||
          ''
        }
      />
      <DeviceOptionsWrapper>
        <StarIcon style={{ cursor: 'pointer' }} className="device-option" />
        <Tooltip title="История показаний" className="device-option">
          <HistoryIcon
            onClick={openReadingsHistoryModal}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
        <div className="device-option">
          <ContextMenuButton menuButtons={[]} size="small" />
        </div>
      </DeviceOptionsWrapper>
    </Wrapper>
  );
};
