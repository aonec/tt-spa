import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetProblemDevicesRequestPayload } from './apartmentProblemDevicesService.types';
import { IndividualDeviceWithExpiredCheckingDateResponse } from 'api/myApi';
import { getProblemDevices } from './apartmentProblemDevicesService.api';
import { preparedDevicesToFetch } from './apartmentProblemDevicesService.constants';

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
  fn: preparedDevicesToFetch,
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
