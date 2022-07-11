import { useSliderIndex } from '01/features/individualDevices/switchIndividualDevice/components/ReadingsInput';
import { MeteringDeviceReadingInput } from '01/features/readings/accountingNodesReadings/components/MeteringDeviceReadingInput';
import { useMeteringDeviceReadings } from '01/features/readings/accountingNodesReadings/components/MeteringDeviceReadingsLine/useMeteringDeviceReadings';
import MonthSlider from '01/shared/ui/devices/MonthSlider';
import DeviceIcons from '01/_components/DeviceIcons';
import React, { FC } from 'react';
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
}) => {
  const { model, resource, serialNumber } = deviceInfo;
  const { canDown, canUp, down, sliderIndex, up } = slider;
  const color = resource ? DeviceIcons[resource].color : '#c3c3c3';

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
          <Input color="#c3c3c3" />
        </OldReadingWrapper>
        <NewReadingWrapper>
          <Input color={color} />
        </NewReadingWrapper>
      </ReadingsWrapper>
    </Wrapper>
  );
};
