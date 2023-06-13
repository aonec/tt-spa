import { useEvent } from 'effector-react';
import moment from 'moment';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { useState, useEffect } from 'react';
import { meteringDeviceReadingsService } from '../MeteringDevicesList/meteringDevicesListService.model';

export interface MeteringDeviceReading
  extends HousingMeteringDeviceReadingsIncludingPlacementResponse {}

export function useMeteringDeviceReadings(id: number, sliderIndex?: number) {
  const [readings, setReadings] = useState<MeteringDeviceReading[] | null>(
    null,
  );

  const updateReadings = useEvent(
    meteringDeviceReadingsService.inputs.updateNodeReadings,
  );

  const previousExistingReading = getPreviousExistingReading(readings || []);

  if (previousExistingReading)
    updateReadings({
      id,
      value: {
        currentReading: getCurrentReading(
          readings?.filter(({ id }) => id) || [],
        ),
        previousExistingReading,
      },
    });

  const [loading, setLoading] = useState(false);

  async function fetchMeteringDeviceReadings(id: number) {
  }

  useEffect(() => void fetchMeteringDeviceReadings(id), [id]);

  const preparedPreviousReadingsArray = getReadingsArrayWithEmpties(
    readings || [],
  );
  return {
    refetch: () => fetchMeteringDeviceReadings(id),
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
    moment(firstReading.readingDate).diff(moment(secondReading.readingDate)),
  );
  return sortReadings[sortReadings.length - 2];
};

const getCurrentReading = (readings: MeteringDeviceReading[]) => {
  const currentDate = moment().add(1, 'month');

  const res = readings.find((reading) => {
    const readingDate = moment(reading.readingDate);
    const diff = currentDate.diff(readingDate, 'months');

    return diff === 0;
  });

  return res;
};

const getReadingsArrayWithEmpties = (readings: MeteringDeviceReading[]) => {
  return readings.reduce((acc, elem) => {
    const dateFormat = 'YYYY-MM';

    const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
    const readingMonthDate = moment(
      moment(elem.readingDate).format(dateFormat),
    );

    if (currentMonthDate.diff(readingMonthDate, 'months') > 11) return acc;
    const index = currentMonthDate.diff(readingMonthDate, 'months');

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: MeteringDeviceReading });
};
