import { useUnit } from 'effector-react';
import React, { FC, useCallback, useEffect, useState } from 'react';
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

  const { loading, newDeviceInitialReadings, oldDeviceInitialReadings } =
    useUnit({
      loading: outputs.$loading,
      oldDeviceInitialReadings: outputs.$oldReadings,
      newDeviceInitialReadings: outputs.$newDeviceInitialReadings,
    });

  const [newDeviceReadings, setNewDeviceReadings] = useState<
    PreparedHousingMeteringDeviceReadings[]
  >([]);
  const [oldDeviceReadings, setOldDeviceReadings] = useState(
    oldDeviceInitialReadings,
  );

  useEffect(() => {
    setNewDeviceReadings(newDeviceInitialReadings);
    setOldDeviceReadings(oldDeviceInitialReadings);
  }, [oldDeviceInitialReadings, newDeviceInitialReadings]);

  useEffect(() => {
    const preparedNewDeviceReadings = prepareReadingsToFormik(
      newDeviceReadings,
      newDeviceInitialReadings,
    );
    onChangeNewReadings(preparedNewDeviceReadings);
  }, [newDeviceReadings, newDeviceInitialReadings, onChangeNewReadings]);

  useEffect(() => {
    const preparedOldDeviceReadings = prepareReadingsToFormik(
      oldDeviceReadings,
      oldDeviceInitialReadings,
    );
    onChangeOldReadings(preparedOldDeviceReadings);
  }, [oldDeviceReadings, oldDeviceInitialReadings, onChangeOldReadings]);

  const handleChangeOldDeviceReadings = useCallback(
    ({ readings }: { readings: PreparedHousingMeteringDeviceReadings[] }) =>
      setOldDeviceReadings(readings),
    [setOldDeviceReadings],
  );
  const handleChangeNewDeviceReadings = useCallback(
    ({ readings }: { readings: PreparedHousingMeteringDeviceReadings[] }) =>
      setNewDeviceReadings(readings),
    [setNewDeviceReadings],
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
