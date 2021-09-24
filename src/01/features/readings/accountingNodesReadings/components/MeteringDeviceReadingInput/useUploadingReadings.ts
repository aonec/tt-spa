import { useState, useEffect } from 'react';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

export function useUploadingReadings(
  meteringDeviceReading?: MeteringDeviceReading
) {
  const [reading, setReading] = useState(meteringDeviceReading);

  useEffect(() => setReading(meteringDeviceReading), [meteringDeviceReading]);

  const onChangeHandler = (value: string) => {
    setReading((prev) =>
      prev
        ? {
            ...prev,
            reading: { ...prev.reading, value: value as any },
          }
        : ({
            reading: { value: value },
          } as any)
    );
  };

  return {
    scopedReading: reading,
    fieldOnChange: onChangeHandler,
    edited:
      String(reading?.reading.value) !==
      String(meteringDeviceReading?.reading.value),
  };
}
