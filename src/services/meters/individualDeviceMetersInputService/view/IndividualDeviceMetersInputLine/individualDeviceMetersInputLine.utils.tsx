import moment from 'moment';
import { IndividualDeviceReadingsResponse } from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import { getReadingValueKey } from '../../individualDeviceMetersInputService.utils';

export function getPreviousMeterTooltipTitle(
  reading: IndividualDeviceReadingsResponse,
  rateNum: number,
  unit: string
) {
  const valuesString = getFilledArray(
    rateNum,
    (index) => reading[getReadingValueKey(index)]
  )
    .map(
      (elem, index) => `${rateNum === 1 ? '' : `T${index + 1}:`} ${elem}${unit}`
    )
    .join(', ');

  const month = moment(reading.readingDateTime).add(1, 'M').format('MMMM');

  return `Последнее показание: ${valuesString} (${month})`;
}
