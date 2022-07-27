import { getMeteringDeviceReadings } from '01/_api/meteringDeviceReadings';
import { useEvent } from 'effector-react';
import moment from 'moment';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { useState, useEffect } from 'react';
import { meteringDeviceReadingsService } from '../MeteringDevicesList/meteringDevicesListService.model';

export interface MeteringDeviceReading
  extends HousingMeteringDeviceReadingsIncludingPlacementResponse {}

export function useMeteringDeviceReadings(id: number, sliderIndex?: number) {
  const [readings, setReadings] = useState<MeteringDeviceReading[] | null>(
    null
  );

  const updateReadings = useEvent(
    meteringDeviceReadingsService.inputs.updateNodeReadings
  );

  const previousExistingReading = getPreviousExistingReading(readings || []);

  if (previousExistingReading)
    updateReadings({
      id,
      value: {
        currentReading: getCurrentReading(
          readings?.filter(({ id }) => id) || []
        ),
        previousExistingReading,
      },
    });

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
    prePreviousReading: preparedPreviousReadingsArray[(sliderIndex || 0) + 1],
  };
}
const getPreviousExistingReading = (readings: MeteringDeviceReading[]) => {
  const sortReadings = readings.sort((firstReading, secondReading) =>
    moment(firstReading.readingDate).diff(moment(secondReading.readingDate))
  );
  return sortReadings[sortReadings.length - 2];
};

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
  return readings.reduce((acc, elem) => {
    const dateFormat = 'YYYY-MM';

    const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
    const readingMonthDate = moment(
      moment(elem.readingDate).format(dateFormat)
    );

    if (currentMonthDate.diff(readingMonthDate, 'months') > 11) return acc;
    const index = currentMonthDate.diff(readingMonthDate, 'months') - 1;

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: MeteringDeviceReading });
};
