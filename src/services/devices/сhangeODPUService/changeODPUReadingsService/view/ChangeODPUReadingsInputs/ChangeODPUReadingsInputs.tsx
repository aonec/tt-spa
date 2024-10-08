import React, { FC, useCallback, useMemo } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { Slider } from '../Slider';
import { oldDeviceReadingsInputsConfig } from './ChangeODPUReadings.inputs.constants';
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
import { getInputBorderColor } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.styled';

export const ChangeODPUReadingsInputs: FC<ChangeODPUReadingsInputsProps> = ({
  title,
  deviceInfo,
  oldReadings,
  onChange,
}) => {
  const currentReading = oldReadings[0];
  const prevReadings = oldReadings.slice(1);

  const color = deviceInfo.resource
    ? getInputBorderColor({ resource: deviceInfo.resource })
    : '#c3c3c3';

  const { model, resource, serialNumber } = deviceInfo;

  const newDeviceReadingsInputsConfig = useMemo(
    () => [
      { field: 'value', color, inputType: 'number', title: ' ' },
      {
        field: 'nonResidentialRoomConsumption',
        color: '#c3c3c3',
        inputType: 'number',
        title: ' ',
      },
    ],
    [color],
  );

  const handleChange = useCallback(
    ({
      newValues,
      id,
    }: {
      newValues: { value?: string; nonResidentialRoomConsumption?: string };
      id: string;
    }) =>
      onChange({
        readings: oldReadings.map((elem) => {
          if (elem.id !== id) return elem;
          if (newValues.value === undefined) {
            const nonResidentialRoomConsumption =
              newValues.nonResidentialRoomConsumption!;
            return { ...elem, nonResidentialRoomConsumption };
          }
          const value = newValues.value;

          return { ...elem, value };
        }),
      }),
    [oldReadings, onChange],
  );

  const handleChangeValue = useCallback(
    ({
      values,
      id,
    }: {
      values: { value?: string; nonResidentialRoomConsumption?: string };
      id: string | number;
    }) => handleChange({ newValues: values, id: String(id) }),
    [handleChange],
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
            onChange={handleChangeValue}
            inputs={oldDeviceReadingsInputsConfig}
          />
        </OldReadingWrapper>

        <NewReadingWrapper>
          <Slider
            values={[currentReading]}
            onChange={handleChangeValue}
            inputs={newDeviceReadingsInputsConfig}
          />
        </NewReadingWrapper>
      </ReadingsWrapper>
    </Wrapper>
  );
};
