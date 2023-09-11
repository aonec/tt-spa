import dayjs from 'api/dayjs';
import { IndividualDeviceResponse } from 'api/types';

export function useDeviceCheckingDates(
  individualDevice: IndividualDeviceResponse | null,
) {
  return (
    individualDevice &&
    `${dayjs(individualDevice.lastCheckingDate).format('DD.MM.YYYY')} — ${dayjs(
      individualDevice.futureCheckingDate,
    ).format('DD.MM.YYYY')}`
  );
}
