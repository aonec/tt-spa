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
    getReadingValue(meteringDeviceReading?.reading.value)
  );

  const edited =
    Boolean(value) &&
    String(value) !== String(meteringDeviceReading?.reading.value);

  useEffect(
    () => setValue(getReadingValue(meteringDeviceReading?.reading.value)),
    [meteringDeviceReading]
  );

  async function saveReading() {}

  return {
    scopedValue: value,
    fieldOnChange: setValue,
    edited,
    saveReading,
  };
}

const getReadingValue = (value?: number): string =>
  (value === 0 ? '0' : String(value)) || '';
