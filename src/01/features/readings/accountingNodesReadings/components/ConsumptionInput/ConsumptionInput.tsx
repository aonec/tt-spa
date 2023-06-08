import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import { updateHousingMeteringDeviceReading } from '01/_api/meteringDeviceReadings';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyledMeteringDeviceReadingInput } from '../MeteringDeviceReadingInput';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';

interface Props {
  reading: MeteringDeviceReading;
  refetch(): void;
  deviceId: number;
}

export const ConsumptionInput: React.FC<Props> = ({ reading, refetch }) => {
  const [value, setValue] = useState(reading.nonResidentialRoomConsumption);
  const [status, setStatus] = useState<RequestStatusShared>();

  useEffect(
    () => setValue(reading.nonResidentialRoomConsumption),
    [reading.nonResidentialRoomConsumption],
  );

  async function saveConsumption() {
    setStatus('pending');
    try {
      if (!reading.id) throw new Error('none id');

      await updateHousingMeteringDeviceReading({
        id: reading.id,
        nonResidentialRoomConsumption: Number(value),
      });

      refetch();

      setStatus('done');
    } catch (error) {
      setStatus('failed');
    }
  }

  return (
    <StyledMeteringDeviceReadingInput
      onKeyDown={fromEnter(saveConsumption)}
      onFocus={(e: any) => e.target.select()}
      status={status}
      color="#c3c3c3"
      value={value || ''}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
};
