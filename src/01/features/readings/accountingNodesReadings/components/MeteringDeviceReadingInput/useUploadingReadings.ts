import { useState, useEffect } from 'react';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

export function useUploadingReadings({
  meteringDeviceReading,
  refetch,
}: {
  meteringDeviceReading?: MeteringDeviceReading;
  refetch: () => void;
}) {
  const [value, setValue] = useState<string>(
    getReadingValue(meteringDeviceReading?.value)
  );

  const edited =
    Boolean(value) &&
    String(value) !== String(meteringDeviceReading?.value);

  useEffect(
    () => setValue(getReadingValue(meteringDeviceReading?.value)),
    [meteringDeviceReading]
  );

  async function putReading() {}

  async function saveReading() {
    if (!edited) return;

    try {
    } catch (error) {}
  }

  return {
    scopedValue: value,
    fieldOnChange: setValue,
    edited,
    saveReading,
  };
}

const getReadingValue = (value?: number): string =>
  (value === 0 ? '0' : String(value)) || '';
