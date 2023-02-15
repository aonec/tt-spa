import { getProblemDevices } from './../../../../_api/apartments';
import {
  ProblemDevicesGate,
  fetchProblemDevicesFx,
  $problemDevices,
} from './index';
import { sample } from 'effector';
import moment from 'moment';

fetchProblemDevicesFx.use(getProblemDevices);

$problemDevices.on(fetchProblemDevicesFx.doneData, (_, devices) => devices);

sample({
  clock: ProblemDevicesGate.state,
  fn: (values) => {
    const res = {
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
    return res;
  },
  filter: (getProblemDevicesRequestPayload) => {
    return (
      Boolean(getProblemDevicesRequestPayload.requestPayload.fromDate) &&
      Boolean(getProblemDevicesRequestPayload.requestPayload.toDate)
    );
  },
  target: fetchProblemDevicesFx,
});
