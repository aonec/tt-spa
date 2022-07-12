import { useStore } from 'effector-react';
import React, { FC, useEffect, useState } from 'react';
import { ChangeODPUReadingsService } from './ChangeODPUReadings.model';
import {
  ChangeODPUReadingsProps,
  PreparedHousingMeteringDeviceReadings,
} from './ChangeODPUReadingsService.types';
import { ChangeODPUReadingsInputs } from './view/ChangeODPUReadingsInputs';

const { gates, outputs } = ChangeODPUReadingsService;

export const ChangeODPUReadingsContainer: FC<ChangeODPUReadingsProps> = ({
  device,
}) => {
  const { resource, serialNumber, model, nodeId } = device || {};
  const oldReadings = useStore(outputs.$oldReadings);

  const [newReadings, setNewReadings] = useState<
    PreparedHousingMeteringDeviceReadings[]
  >([]);
  const [editedReadings, setEditedReadings] = useState(oldReadings);

  useEffect(() => {
    setNewReadings(
      oldReadings.map((elem) => ({
        readingDate: elem.readingDate,
        id: elem.id,
        text: elem.text,
        value: null,
      }))
    );
    setEditedReadings(oldReadings);
  }, [oldReadings]);

  const { OldDeviceNodeIdGate } = gates;

  return (
    <>
      <OldDeviceNodeIdGate nodeId={nodeId!} />
      {oldReadings.length && (
        <ChangeODPUReadingsInputs
          title="Заменяемый прибор"
          deviceInfo={{ resource, serialNumber, model }}
          oldReadings={editedReadings}
          onChange={({ readings }) => setEditedReadings(readings)}
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
        onChange={({ readings }) => setNewReadings(readings)}
      />
    </>
  );
};
