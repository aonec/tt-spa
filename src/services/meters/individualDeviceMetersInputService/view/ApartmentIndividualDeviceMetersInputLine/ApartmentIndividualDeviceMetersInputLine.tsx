import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
import { HistoryIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getMeasurementUnit } from '../../individualDeviceMetersInputService.utils';
import { getPreviousMeterTooltipTitle } from '../IndividualDeviceMetersInputLine/individualDeviceMetersInputLine.utils';
import { MetersInputsBlock } from '../MetersInputsBlock';
import { getRateNum } from '../MetersInputsBlock/MetersInputsBlock.utils';
import {
  ConsumptionWrapper,
  DeviceInfoWrapper,
  Wrapper,
} from './ApartmentIndividualDeviceMetersInputLine.styled';
import { ApartmentIndividualDeviceMetersInputLineProps } from './ApartmentIndividualDeviceMetersInputLine.types';
import { getReadingValuesArray } from './ApartmentIndividualDeviceMetersInputLine.utils';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';

export const ApartmentIndividualDeviceMetersInputLine: FC<ApartmentIndividualDeviceMetersInputLineProps> = ({
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

  const isDeviceClosed = Boolean(device.closingDate);

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

  const rateNum = getRateNum(device.rateType);

  const consumptionValues = useMemo(() => {
    if (!previousReading || !currentReading) return null;

    const prevReadingValues = getReadingValuesArray(previousReading, rateNum);
    const currentReadingValues = getReadingValuesArray(currentReading, rateNum);

    return currentReadingValues.map((value, index) => {
      const prevReadingValue = prevReadingValues[index];

      if (!value || !prevReadingValue) return null;

      return value - prevReadingValue;
    });
  }, [previousReading, currentReading, rateNum]);

  return (
    <Wrapper>
      <div>{device.apartmentNumber}</div>
      <DeviceInfoWrapper>
        <div className="device-icon">
          <ResourceIconLookup resource={device.resource} />
        </div>
        <Tooltip title={`${device.serialNumber} (${device.model})`}>
          <div className="device-info-text">
            <strong>{device.serialNumber}</strong>
            <div>{device.model}</div>
          </div>
        </Tooltip>
      </DeviceInfoWrapper>
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
        disableAutoFocus
        tooltip={
          (!previousReading &&
            !currentReading &&
            previousReadingTooltipTitle) ||
          ''
        }
      />
      <ConsumptionWrapper>
        {consumptionValues?.map((value, index) => (
          <div className="consumption-value" key={index}>
            {value}
          </div>
        )) || '-'}
      </ConsumptionWrapper>
      <Tooltip title="История показаний" className="device-option">
        <HistoryIcon
          onClick={openReadingsHistoryModal}
          style={{ cursor: 'pointer' }}
        />
      </Tooltip>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
