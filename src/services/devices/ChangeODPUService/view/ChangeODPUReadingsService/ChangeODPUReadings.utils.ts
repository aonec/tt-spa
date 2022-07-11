import moment from 'moment';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export const prepareDataWithEmpties = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) =>
  readings.reduce((acc, elem) => {
    const dateFormat = 'YYYY-MM';
    const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
    const readingMonthDate = moment(
      moment(elem.readingDate).format(dateFormat)
    );

    if (currentMonthDate.diff(readingMonthDate, 'months') > 7) return acc;

    const index = currentMonthDate.diff(readingMonthDate, 'months') - 1;

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: HousingMeteringDeviceReadingsIncludingPlacementResponse });
