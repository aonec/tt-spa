import { useSliderIndex } from '01/features/individualDevices/switchIndividualDevice/components/ReadingsInput';
import React, { FC } from 'react';
import { ChangeODPUReadingsService } from './ChangeODPUReadings.model';
import { ChangeODPUReadingsProps } from './ChangeODPUReadingsService.types';
import { ChangeODPUReadingsInputs } from './view/ChangeODPUReadingsInputs';

const { gates } = ChangeODPUReadingsService;

export const ChangeODPUReadingsContainer: FC<ChangeODPUReadingsProps> = ({
  device,
}) => {
  const { resource, serialNumber, model, nodeId } = device || {};

  const oldDeviceSlider = useSliderIndex();
  const deviceSlider = useSliderIndex();
  const { OldDeviceNodeIdGate } = gates;

  return (
    <>
      <OldDeviceNodeIdGate nodeId={nodeId!} />
      <ChangeODPUReadingsInputs
        title="Заменяемый прибор"
        deviceInfo={{ resource, serialNumber, model }}
        slider={oldDeviceSlider}
      />
      <ChangeODPUReadingsInputs
        title="Новый прибор"
        deviceInfo={{
          resource,
          serialNumber: 'Серийный номер',
          model: 'Модель',
        }}
        slider={deviceSlider}
      />
    </>
  );
};
