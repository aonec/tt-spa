import moment from 'moment';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import { getRateNum } from './view/MetersInputsBlock/MetersInputsBlock.utils';

export function getPreparedReadingsDictionary(
  readings: IndividualDeviceReadingsResponse[]
) {
  return readings.reduce((acc, elem) => {
    const dateFormat = 'YYYY-MM';

    const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
    const readingMonthDate = moment(
      moment(elem.readingDateTime).format(dateFormat)
    );

    if (currentMonthDate.diff(readingMonthDate, 'months') > 11) return acc;

    const index = currentMonthDate.diff(readingMonthDate, 'months') - 1;

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: IndividualDeviceReadingsResponse });
}

export const getInputIndex = (
  deviceIndex: number,
  devices: IndividualDeviceListItemResponse[],
  filterClosed?: boolean
) => {
  const devicesList = filterClosed
    ? devices
    : devices.filter((device) => device.closingDate === null);

  const inputIndex = devicesList
    .slice(0, deviceIndex)
    .filter((elem) => elem.closingDate === null)
    .reduce((acc, elem) => acc + getRateNum(elem.rateType), 0);

  return inputIndex;
};
