import { getMeteringDeviceReadings } from '01/_api/meteringDeviceReadings';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { useState, useEffect } from 'react';

interface MeteringDeviceReading {
  reading: HousingMeteringDeviceReadingsIncludingPlacementResponse;
}

export function useMeteringDeviceReadings(id: number) {
  const [readings, setReadings] = useState<MeteringDeviceReading[] | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  async function fetchMeteringDeviceReadings() {
    setLoading(true);

    try {
      const response = await getMeteringDeviceReadings(id);

      const newReadings = response.map((reading) => ({ reading }));

      setReadings(newReadings);
    } catch (error) {}

    setLoading(false);
  }

  useEffect(() => void fetchMeteringDeviceReadings(), [id]);

  return { refetch: fetchMeteringDeviceReadings, readings, loading };
}
