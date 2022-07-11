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
  newReadings,
}) => {
  const [readings, setReadings] = useState<
    SwitchHousingDeviceReadingsCreateRequest[]
  >([]);

  const { model, resource, serialNumber } = deviceInfo;
  const { canDown, canUp, down, sliderIndex, up } = slider;
  const color = resource ? DeviceIcons[resource].color : '#c3c3c3';

  const newReading = oldReadings[-1] || { value: '', readingDate: moment() };

  const reading =
    readings.find(
      (elem) => elem.readingDate === oldReadings[sliderIndex].readingDate
    ) || oldReadings[sliderIndex];

  const handleChange = useCallback(
    ({ value, readingDate }: { value: number; readingDate: string }) =>
      setReadings((prevReadings) => {
        const isValuesEqual = value === oldReadings[sliderIndex]?.value;
        if (isValuesEqual) {
          return [
            ...prevReadings.filter((elem) => elem.readingDate !== readingDate),
          ];
        }
        return [
          ...prevReadings.filter((elem) => elem.readingDate !== readingDate),
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
            value={reading?.value}
            type="number"
            onChange={(e) => {
              handleChange({
                value: Number(e.target.value),
                readingDate: reading.readingDate,
              });
            }}
          />
        </OldReadingWrapper>
        <NewReadingWrapper>
          <Input
            color={color}
            type="number"
            value={newReading.value}
            onChange={(e) => {
              handleChange({
                value: Number(e.target.value),
                readingDate: newReading.readingDate,
              });
            }}
          />
        </NewReadingWrapper>
      </ReadingsWrapper>
    </Wrapper>
  );
};
