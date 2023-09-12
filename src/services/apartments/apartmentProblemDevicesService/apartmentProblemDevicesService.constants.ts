import dayjs from 'api/dayjs';
import { GetProblemDevicesRequestPayload } from './apartmentProblemDevicesService.types';

export function preparedDevicesToFetch(
  values: GetProblemDevicesRequestPayload,
) {
  return {
    ...values,
    requestPayload: {
      ...values.requestPayload,
      fromDate:
        values.requestPayload?.fromDate &&
        dayjs(values.requestPayload?.fromDate).format('YYYY-MM-DD'),
      toDate:
        values.requestPayload?.toDate &&
        dayjs(values.requestPayload?.toDate).format('YYYY-MM-DD'),
    },
  };
}
