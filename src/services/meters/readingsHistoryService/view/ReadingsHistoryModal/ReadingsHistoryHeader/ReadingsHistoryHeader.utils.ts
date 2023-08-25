import moment from 'moment';
import { IndividualDeviceResponse } from 'api/types';

export function useDeviceCheckingDates(
  individualDevice: IndividualDeviceResponse | null,
) {
  return (
    individualDevice &&
    `${moment(individualDevice.lastCheckingDate).format(
      'DD.MM.YYYY',
    )} — ${moment(individualDevice.futureCheckingDate).format('DD.MM.YYYY')}`
  );
}
