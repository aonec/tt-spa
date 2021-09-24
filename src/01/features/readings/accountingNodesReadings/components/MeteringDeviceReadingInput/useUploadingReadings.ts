import { useState, useEffect } from 'react';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

export function useUploadingReadings(
  meteringDeviceReading?: MeteringDeviceReading,
  refetch?: () => void
) {
  const [value, setValue] = useState<string>(
    String(meteringDeviceReading?.reading.value)
  );

  const edited =
    Boolean(value) &&
    String(value) !== String(meteringDeviceReading?.reading.value);

  useEffect(() => setValue(String(meteringDeviceReading?.reading.value)), [
    meteringDeviceReading,
  ]);

  async function saveReading() {}

  return {
    scopedValue: value,
    fieldOnChange: setValue,
    edited,
  };
}
