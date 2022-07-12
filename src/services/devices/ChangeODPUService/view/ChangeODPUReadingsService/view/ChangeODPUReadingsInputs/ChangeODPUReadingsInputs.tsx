import React, { FC, useCallback } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Slider } from '../Slider';
import {
  DeviceInfo,
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
  oldReadings,
  onChange,
}) => {
  const currentReading = oldReadings[0];
  const prevReadings = oldReadings.slice(1);

  const { model, resource, serialNumber } = deviceInfo;

  const handleChange = useCallback(
    ({ value, id }: { value: number; id: string }) =>
      onChange({
        readings: [
          ...oldReadings.map((elem) => {
            if (elem.id !== id) return elem;
            return { ...elem, value };
          }),
        ],
      }),
    [oldReadings, onChange]
  );

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
          <Slider
            values={prevReadings}
            onChange={({ value, id }) =>
              handleChange({ value: Number(value), id: String(id) })
            }
          />
        </OldReadingWrapper>
        <NewReadingWrapper>
          <Slider
            values={[currentReading]}
            onChange={({ value, id }) =>
              handleChange({ value: Number(value), id: String(id) })
            }
            resource={resource}
          />
        </NewReadingWrapper>
      </ReadingsWrapper>
    </Wrapper>
  );
};
