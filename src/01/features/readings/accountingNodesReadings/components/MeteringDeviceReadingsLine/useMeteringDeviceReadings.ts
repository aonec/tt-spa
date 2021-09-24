import { getMeteringDeviceReadings } from '01/_api/meteringDeviceReadings';
import moment from 'moment';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { useState, useEffect } from 'react';

export interface MeteringDeviceReading
  extends HousingMeteringDeviceReadingsIncludingPlacementResponse {}

export function useMeteringDeviceReadings(id: number, sliderIndex?: number) {
  const [readings, setReadings] = useState<MeteringDeviceReading[] | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  async function fetchMeteringDeviceReadings() {
    setLoading(true);

    try {
      const response = await getMeteringDeviceReadings(id);

      const newReadings = response;

      setReadings(newReadings);
    } catch (error) {}

    setLoading(false);
  }

  useEffect(() => void fetchMeteringDeviceReadings(), [id]);

  const preparedPreviousReadingsArray = getReadingsArrayWithEmpties(
    readings || []
  );

  return {
    refetch: fetchMeteringDeviceReadings,
    readings,
    loading,
    preparedPreviousReadingsArray,
    currentReading: getCurrentReading(readings || []),
    previousReading: sliderIndex
      ? preparedPreviousReadingsArray[sliderIndex]
      : undefined,
  };
}

const getCurrentReading = (readings: MeteringDeviceReading[]) => {
  const currentDate = moment();

  return readings.find((reading) => {
    const readingDate = moment(reading.readingDate);

    if (currentDate.diff(readingDate, 'months') > 11) return false;

    if (currentDate.month() === readingDate.month()) return true;
  });
};

const getReadingsArrayWithEmpties = (readings: MeteringDeviceReading[]) => {
  const currentDate = moment();
  return readings.reduce((acc, elem) => {
    if (currentDate.diff(elem.readingDate, 'months') > 11) return acc;

    const index =
      Number(moment().format('M')) -
      Number(moment(elem.readingDate).format('M')) -
      1;

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: MeteringDeviceReading });
};
