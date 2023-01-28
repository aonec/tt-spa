import { useStore } from 'effector-react';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ChangeODPUReadingsService } from './changeODPUReadings.model';
import { Wrapper } from './changeODPUReadings.styled';
import { prepareReadingsToFormik } from './changeODPUReadings.utils';
import {
  ChangeODPUReadingsProps,
  PreparedHousingMeteringDeviceReadings,
} from './changeODPUReadingsService.types';
import { ChangeODPUReadingsInputs } from './view/ChangeODPUReadingsInputs';

const { gates, outputs } = ChangeODPUReadingsService;

const { OldDeviceNodeIdGate } = gates;

export const ChangeODPUReadingsContainer: FC<ChangeODPUReadingsProps> = ({
  device,
  onChangeNewReadings,
  onChangeOldReadings,
}) => {
  const { resource, serialNumber, model, nodeId } = device || {};

  const loading = useStore(outputs.$loading);

  const oldDeviceInitialReadings = useStore(outputs.$oldReadings);
  const newDeviceInitialReadings = useStore(outputs.$newDeviceInitialReadings);

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

  const handleChangeOldDeviceReadings = useCallback(
    ({ readings }) => setOldDeviceReadings(readings),
    [setOldDeviceReadings]
  );
  const handleChangeNewDeviceReadings = useCallback(
    ({ readings }) => setNewDeviceReadings(readings),
    [setNewDeviceReadings]
  );

  return (
    <>
      <OldDeviceNodeIdGate nodeId={nodeId!} />
      <Wrapper disabled={loading}>
        <ChangeODPUReadingsInputs
          title="Заменяемый прибор"
          deviceInfo={{ resource, serialNumber, model }}
          oldReadings={oldDeviceReadings}
          onChange={handleChangeOldDeviceReadings}
        />
        <ChangeODPUReadingsInputs
          title="Новый прибор"
          deviceInfo={{
            resource,
            serialNumber: 'Серийный номер',
            model: 'Модель',
          }}
          oldReadings={newDeviceReadings}
          onChange={handleChangeNewDeviceReadings}
        />
      </Wrapper>
    </>
  );
};
