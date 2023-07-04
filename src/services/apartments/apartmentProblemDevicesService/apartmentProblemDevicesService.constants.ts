import moment from 'moment';
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
        moment(values.requestPayload?.fromDate).format('YYYY-MM-DD'),
      toDate:
        values.requestPayload?.toDate &&
        moment(values.requestPayload?.toDate).format('YYYY-MM-DD'),
    },
  };
}
