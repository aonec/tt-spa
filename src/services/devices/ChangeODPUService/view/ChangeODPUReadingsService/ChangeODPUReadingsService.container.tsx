import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { ChangeODPUReadingsService } from './ChangeODPUReadings.model';
import { ChangeODPUReadingsProps } from './ChangeODPUReadingsService.types';
import { ChangeODPUReadingsInputs } from './view/ChangeODPUReadingsInputs';

const { gates, outputs } = ChangeODPUReadingsService;

export const ChangeODPUReadingsContainer: FC<ChangeODPUReadingsProps> = ({
  device,
}) => {
  const { resource, serialNumber, model, nodeId } = device || {};

  const oldReadings = useStore(outputs.$oldReadings);
  const newReadings = oldReadings.map((elem) => ({
    readingDate: elem.readingDate,
    id: elem.id,
    text: elem.text,
    value: 0,
  }));

  const { OldDeviceNodeIdGate } = gates;

  return (
    <>
      <OldDeviceNodeIdGate nodeId={nodeId!} />
      {oldReadings.length && (
        <ChangeODPUReadingsInputs
          title="Заменяемый прибор"
          deviceInfo={{ resource, serialNumber, model }}
          oldReadings={oldReadings}
          onChange={console.log}
        />
      )}
      <ChangeODPUReadingsInputs
        title="Новый прибор"
        deviceInfo={{
          resource,
          serialNumber: 'Серийный номер',
          model: 'Модель',
        }}
        oldReadings={newReadings}
        onChange={console.log}
      />
    </>
  );
};
