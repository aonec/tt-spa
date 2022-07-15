import DeviceIcons from '01/_components/DeviceIcons';
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

  const color = deviceInfo.resource
    ? DeviceIcons[deviceInfo.resource].color
    : '#c3c3c3';

  const { model, resource, serialNumber } = deviceInfo;

  const handleChange = useCallback(
    ({
      newValues,
      id,
    }: {
      newValues: { value?: string; nonResidentialRoomConsumption?: string };
      id: string;
    }) =>
      onChange({
        readings: [
          ...oldReadings.map((elem) => {
            if (elem.id !== id) return elem;
            if (newValues.value === undefined) {
              const nonResidentialRoomConsumption = newValues.nonResidentialRoomConsumption!;
              return { ...elem, nonResidentialRoomConsumption };
            }
            const value = newValues.value;

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
            onChange={({ values, id }) =>
              handleChange({ newValues: values, id: String(id) })
            }
            inputs={[
              {
                field: 'value',
                color,
                inputType: 'number',
                title: 'Основной расход',
              },
              {
                field: 'nonResidentialRoomConsumption',
                color: '#c3c3c3',
                inputType: 'number',
                title: 'Расход на нежилые пом.',
              },
            ]}
          />
        </OldReadingWrapper>

        <NewReadingWrapper>
          <Slider
            values={[currentReading]}
            onChange={({ values, id }) => {
              handleChange({ newValues: values, id: String(id) });
            }}
            inputs={[
              { field: 'value', color, inputType: 'number', title: ' ' },
              {
                field: 'nonResidentialRoomConsumption',
                color: '#c3c3c3',
                inputType: 'number',
                title: ' ',
              },
            ]}
          />
        </NewReadingWrapper>
      </ReadingsWrapper>
    </Wrapper>
  );
};
