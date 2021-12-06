import { getProblemDevices } from './../../../../_api/apartments';
import {
  ProblemDevicesGate,
  fetchProblemDevicesFx,
  $problemDevices,
} from './index';
import { forward } from 'effector';
import moment from 'moment';

fetchProblemDevicesFx.use(getProblemDevices);

$problemDevices.on(fetchProblemDevicesFx.doneData, (_, devices) => devices);

forward({
  from: ProblemDevicesGate.state.map((values) => ({
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
  })),
  to: fetchProblemDevicesFx,
});
