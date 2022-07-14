import { useStore } from 'effector-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { ChangeODPUReadingsService } from './ChangeODPUReadings.model';
import { Wrapper } from './ChangeODPUReadings.styled';
import { prepareReadingsToFormik } from './ChangeODPUReadings.utils';
import {
  ChangeODPUReadingsProps,
  PreparedHousingMeteringDeviceReadings,
} from './ChangeODPUReadingsService.types';
import { ChangeODPUReadingsInputs } from './view/ChangeODPUReadingsInputs';

const { gates, outputs } = ChangeODPUReadingsService;

export const ChangeODPUReadingsContainer: FC<ChangeODPUReadingsProps> = ({
  device,
  onChangeNewReadings,
  onChangeOldReadings,
}) => {
  const { resource, serialNumber, model, nodeId } = device || {};

  const loading = useStore(outputs.$loading);

  const oldDeviceInitialReadings = useStore(outputs.$oldReadings);
  const newDeviceInitialReadings = useMemo(
    () =>
      oldDeviceInitialReadings.map((elem) => {
        return {
          readingDate: elem.readingDate,
          id: elem.id,
          text: elem.text,
          value: null,
          nonResidentialRoomConsumption: null,
        };
      }),
    [oldDeviceInitialReadings]
  );

  const [newDeviceReadings, setNewDeviceReadings] = useState<
    PreparedHousingMeteringDeviceReadings[]
  >([]);
  const [oldDeviceReadings, setOldDeviceReadings] = useState(
    oldDeviceInitialReadings
  );

  useEffect(() => {
    setNewDeviceReadings(newDeviceInitialReadings);
    setOldDeviceReadings(oldDeviceInitialReadings);
  }, [oldDeviceInitialReadings]);

  useEffect(() => {
    const preparedNewDeviceReadings = prepareReadingsToFormik(
      newDeviceReadings,
      newDeviceInitialReadings
    );
    onChangeNewReadings(preparedNewDeviceReadings);
  }, [newDeviceReadings]);

  useEffect(() => {
    const preparedOldDeviceReadings = prepareReadingsToFormik(
      oldDeviceReadings,
      oldDeviceInitialReadings
    );
    onChangeOldReadings(preparedOldDeviceReadings);
  }, [oldDeviceReadings]);

  const { OldDeviceNodeIdGate } = gates;

  return (
    <>
      <OldDeviceNodeIdGate nodeId={nodeId!} />
      <Wrapper disabled={loading}>
        <ChangeODPUReadingsInputs
          title="Заменяемый прибор"
          deviceInfo={{ resource, serialNumber, model }}
          oldReadings={oldDeviceReadings}
          onChange={({ readings }) => setOldDeviceReadings(readings)}
        />
        <ChangeODPUReadingsInputs
          title="Новый прибор"
          deviceInfo={{
            resource,
            serialNumber: 'Серийный номер',
            model: 'Модель',
          }}
          oldReadings={newDeviceReadings}
          onChange={({ readings }) => setNewDeviceReadings(readings)}
        />
      </Wrapper>
    </>
  );
};
