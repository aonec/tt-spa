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

      setReadings(newReadings.filter((elem) => !elem.isArchived));
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
    currentReading: getCurrentReading(readings?.filter(({ id }) => id) || []),
    previousReading: preparedPreviousReadingsArray[sliderIndex || 0],
  };
}

const getCurrentReading = (readings: MeteringDeviceReading[]) => {
  const currentDate = moment();

  const res = readings.find((reading) => {
    const readingDate = moment(reading.readingDate);
    const diff = currentDate.diff(reading.readingDate, 'months');

    if (diff !== 0) return false;

    if (currentDate.month() === readingDate.month()) return true;
  });

  return res;
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
