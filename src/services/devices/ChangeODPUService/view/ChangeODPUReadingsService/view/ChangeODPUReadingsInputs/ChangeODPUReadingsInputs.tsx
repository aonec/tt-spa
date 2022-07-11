import { useSliderIndex } from '01/features/individualDevices/switchIndividualDevice/components/ReadingsInput';
import { MeteringDeviceReadingInput } from '01/features/readings/accountingNodesReadings/components/MeteringDeviceReadingInput';
import { useMeteringDeviceReadings } from '01/features/readings/accountingNodesReadings/components/MeteringDeviceReadingsLine/useMeteringDeviceReadings';
import MonthSlider from '01/shared/ui/devices/MonthSlider';
import DeviceIcons from '01/_components/DeviceIcons';
import moment from 'moment';
import { SwitchHousingDeviceReadingsCreateRequest } from 'myApi';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  DeviceInfo,
  Input,
  ModelWrapper,
  NewReadingWrapper,
  OldReadingWrapper,
  ReadingsWrapper,
  SerialNumberWrapper,
  Title,
  Wrapper,
} from './ChangeODPUReadingsInputs.styled';
import { ChangeODPUReadingsInputsProps } from './ChangeODPUReadingsInputs.types';

export const ChangeODPUReadingsInputs: FC<ChangeODPUReadingsInputsProps> = ({
  title,
  deviceInfo,
  slider,
  oldReadings,
}) => {
  const [readings, setReadings] = useState<
    SwitchHousingDeviceReadingsCreateRequest[]
  >([]);

  const { model, resource, serialNumber } = deviceInfo;
  const { canDown, canUp, down, sliderIndex, up } = slider;
  const color = resource ? DeviceIcons[resource].color : '#c3c3c3';

  const currentDate = moment().format('YYYY-MM-01');
  const currentMonth = moment().month() + 1;
  const readingDate = moment().format(`YYYY-${currentMonth - sliderIndex}-01`);

  const currentReading = oldReadings[-1]
    ? readings.find(
        (elem) => elem?.readingDate === oldReadings[-1]?.readingDate
      ) || oldReadings[-1]
    : readings.find((elem) => elem.readingDate === currentDate);

  const prevReading = oldReadings[sliderIndex]
    ? readings.find(
        (elem) => elem?.readingDate === oldReadings[sliderIndex]?.readingDate
      ) || oldReadings[sliderIndex]
    : readings.find((elem) => elem.readingDate === readingDate);

  const handleChange = useCallback(
    ({ value, readingDate }: { value: number; readingDate: string }) =>
      setReadings((prevReadings) => {
        const isValuesEqual = value === oldReadings[sliderIndex]?.value;
        if (isValuesEqual) {
          return [
            ...prevReadings.filter((elem) => elem?.readingDate !== readingDate),
          ];
        }
        return [
          ...prevReadings.filter((elem) => elem?.readingDate !== readingDate),
          { readingDate, value },
        ];
      }),
    [setReadings, oldReadings]
  );

  useEffect(() => {
    console.log(readings);
  }, [readings]);

  return (
    <Wrapper>
      <Title>
        {title}
        <DeviceInfo>
          {resource && <ResourceIconLookup resource={resource} />}
          <SerialNumberWrapper>{serialNumber}</SerialNumberWrapper>
          <ModelWrapper>{model}</ModelWrapper>
        </DeviceInfo>
      </Title>
      <ReadingsWrapper>
        <OldReadingWrapper>
          <MonthSlider
            onClickIncrease={up}
            onClickDecrease={down}
            isNextArrowDisabled={!canDown}
            isPreviousArrowDisabled={!canUp}
            sliderIndex={sliderIndex}
          />
          <Input
            color="#c3c3c3"
            value={prevReading?.value || ''}
            type="number"
            onChange={(e) => {
              handleChange({
                value: Number(e.target.value),
                readingDate: prevReading?.readingDate || readingDate,
              });
            }}
          />
        </OldReadingWrapper>
        <NewReadingWrapper>
          <Input
            color={color}
            type="number"
            value={currentReading?.value || ''}
            onChange={(e) => {
              handleChange({
                value: Number(e.target.value),
                readingDate: currentReading?.readingDate || currentDate,
              });
            }}
          />
        </NewReadingWrapper>
      </ReadingsWrapper>
    </Wrapper>
  );
};
