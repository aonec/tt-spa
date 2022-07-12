import React, { FC, useCallback, useEffect } from 'react';
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
    ({ newValue, id }: { newValue: string; id: string }) =>
      onChange({
        readings: [
          ...oldReadings.map((elem) => {
            if (elem.id !== id) return elem;
            const value = newValue === '' ? null : Number(newValue);
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
              handleChange({ newValue: value, id: String(id) })
            }
          />
        </OldReadingWrapper>
        <NewReadingWrapper>
          <Slider
            values={[currentReading]}
            onChange={({ value, id }) =>
              handleChange({ newValue: value, id: String(id) })
            }
            resource={resource}
          />
        </NewReadingWrapper>
      </ReadingsWrapper>
    </Wrapper>
  );
};
