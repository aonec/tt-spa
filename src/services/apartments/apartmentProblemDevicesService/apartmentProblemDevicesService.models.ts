import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetProblemDevicesRequestPayload } from './apartmentProblemDevicesService.types';
import { IndividualDeviceWithExpiredCheckingDateResponse } from 'myApi';
import { getProblemDevices } from './apartmentProblemDevicesService.api';
import moment from 'moment';

const domain = createDomain('apartmentProblemDevicesService');

const ProblemDevicesGate = createGate<GetProblemDevicesRequestPayload>();

const fetchProblemDevicesFx = domain.createEffect<
  GetProblemDevicesRequestPayload,
  IndividualDeviceWithExpiredCheckingDateResponse[]
>(getProblemDevices);

const handleResetProblemDevices = domain.createEvent();

const $problemDevices = domain
  .createStore<IndividualDeviceWithExpiredCheckingDateResponse[] | null>(null)
  .on(fetchProblemDevicesFx.doneData, (_, devices) => devices)
  .reset(handleResetProblemDevices);

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
    const { fromDate, toDate } = getProblemDevicesRequestPayload.requestPayload;

    return Boolean(fromDate && toDate);
  },
  target: fetchProblemDevicesFx,
});

export const apartmentProblemDevicesService = {
  inputs: { handleResetProblemDevices },
  outputs: { $problemDevices },
  gates: { ProblemDevicesGate },
};
