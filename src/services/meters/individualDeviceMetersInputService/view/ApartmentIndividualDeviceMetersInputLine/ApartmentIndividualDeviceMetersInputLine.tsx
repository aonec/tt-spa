import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
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

  const rateNum = useMemo(() => getRateNum(device.rateType), [device]);

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
        tooltip={
          (!previousReading &&
            !currentReading &&
            previousReadingTooltipTitle) ||
          ''
        }
      />
      <ConsumptionWrapper>
        {consumptionValues?.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </ConsumptionWrapper>
    </Wrapper>
  );
};
