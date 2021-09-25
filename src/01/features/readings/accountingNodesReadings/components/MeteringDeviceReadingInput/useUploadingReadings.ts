import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import {
  createOrUpdateLast,
  deleteMeteringDeviceReading,
} from '01/_api/meteringDeviceReadings';
import { useState, useEffect } from 'react';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

interface Params {
  meteringDeviceReading?: MeteringDeviceReading;
  refetch: () => void;
  deviceId: number;
}

export function useUploadingReadings(params: Params) {
  const { meteringDeviceReading, refetch, deviceId } = params;

  const [value, setValue] = useState<string>(
    getReadingValue(meteringDeviceReading?.value)
  );

  const [status, setStatus] = useState<RequestStatusShared>(null);

  const edited =
    Boolean(value) && String(value) !== String(meteringDeviceReading?.value);

  useEffect(() => setValue(getReadingValue(meteringDeviceReading?.value)), [
    meteringDeviceReading,
  ]);

  async function saveReading() {
    if (!edited) return;

    setStatus('pending');
    try {
      await createOrUpdateLast({
        deviceId,
        value: Number(value),
        nonResidentialRoomConsumption:
          meteringDeviceReading?.nonResidentialRoomConsumption,
      });

      setStatus('done');
      refetch();
    } catch (error) {
      setStatus('failed');
    }
  }

  async function deleteReading() {
    try {
      setStatus('pending');
      await deleteMeteringDeviceReading(meteringDeviceReading?.id!);

      setStatus('done');
      refetch();
    } catch (error) {
      setStatus('failed');
    }
  }

  return {
    scopedValue: value,
    fieldOnChange: setValue,
    edited,
    saveReading,
    status,
    deleteReading,
  };
}

const getReadingValue = (value?: number): string =>
  (value === 0 ? '0' : String(value)) || '';
