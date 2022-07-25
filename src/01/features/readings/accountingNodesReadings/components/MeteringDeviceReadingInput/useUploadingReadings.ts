import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import { openConfirmReadingModal } from '01/features/readings/readingsInput/confirmInputReadingModal/models';
import {
  createOrUpdateLast,
  deleteMeteringDeviceReading,
} from '01/_api/meteringDeviceReadings';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

interface Params {
  meteringDeviceReading?: MeteringDeviceReading;
  refetch: () => void;
  deviceId: number;
  prevValue?: number;
  monthIndex:number;
}

export function useUploadingReadings(params: Params) {
  const { meteringDeviceReading, refetch, deviceId, prevValue } = params;
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

    const date = moment().subtract(params.monthIndex, 'month');
    try {
      await createOrUpdateLast({
        deviceId,
        value: Number(value),
        nonResidentialRoomConsumption:
          meteringDeviceReading?.nonResidentialRoomConsumption,
        readingDate: date.toISOString(true),
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
    saveReading() {
      if (prevValue && Number(value) < prevValue)
        return openConfirmReadingModal({
          title: `Показание ${value} меньше предыдущего (${prevValue})`,
          onSubmit: saveReading,
        });

      saveReading();
    },
    status,
    deleteReading,
  };
}

const getReadingValue = (value?: number): string =>
  (value === 0 ? '0' : String(value)) || '';
